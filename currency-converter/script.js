const input1 = document.getElementById('input-1');
const input2 = document.getElementById('input-2');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');

let lastEdited = 'input-1';
let debounceTimer;
const rateCache = {}; // stores rates as key–value pairs. eg: "USD_EUR": 0.9123

// fetches rate: 1 unit of `from` = ? units of `to`
// Uses Frankfurter v2 API, which supports ~165 active currencies
async function getRate(from, to) {
    if (from === to) return 1;

    const cacheKey = `${from}_${to}`;
    if (rateCache[cacheKey] !== undefined) {
        return rateCache[cacheKey];
    }

    const url = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Rate request failed');

    const data = await response.json();
    const rate = data.rate;

    if (rate === undefined) throw new Error('Currency not supported');

    rateCache[cacheKey] = rate;
    return rate;
}

async function convert() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = lastEdited === 'input-1' ? input1.value : input2.value;

    // wait until both currencies are actually selected
    if (from === "" || to === "") {
        if (lastEdited === 'input-1') input2.value = '';
        else input1.value = '';
        return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
        if (lastEdited === 'input-1') input2.value = '';
        else input1.value = '';
        return;
    }

    try {
        const rate = await getRate(from, to);

        if (lastEdited === 'input-1') {
            input2.value = (Number(amount) * rate).toFixed(2);
        } else {
            // rate is always from -> to, so divide when going backwards
            input1.value = (Number(amount) / rate).toFixed(2);
        }
    } catch (err) {
        console.error('Currency conversion error:', err);
        const target = lastEdited === 'input-1' ? input2 : input1;
        target.value = 'N/A';
    }
}

function debounceConvert() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(convert, 150);
}

input1.addEventListener('input', () => {
    lastEdited = 'input-1';
    debounceConvert();
});

input2.addEventListener('input', () => {
    lastEdited = 'input-2';
    debounceConvert();
});

function resetAndConvert() {
    input1.value = 1;
    lastEdited = 'input-1';
    debounceConvert();
}

fromSelect.addEventListener('change', resetAndConvert);
toSelect.addEventListener('change', resetAndConvert);