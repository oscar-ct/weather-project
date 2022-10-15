const USD = (hi) => {
    let note = "";
    let power = 1;
    let charCode = 0;
    for (let i = hi.length - 1; i >= 0; i--) {
        charCode += power * parseInt(hi[i]);
        power <<= 1;
        if (i % 8 === 0) {
            let character = String.fromCharCode(charCode);
            note = character + note;
            power = 1;
            charCode = 0;
        }
    }
    return note;
}