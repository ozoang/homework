async function swapLetter() {
    try {
        const letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        let A = '';

        function swap() {
            for (i = 0; i < letter.length; i++) {
                if (i % 2 == 0) {

                    let l1 = i;
                    let l2 = i + 1;

                    let a = letter[l1];
                    letter[l1] = letter[l2];
                    letter[l2] = a;
                }
            }
        }

        function output() {
            for (i = 0; i < letter.length; i++) {

                A += letter[i] + ' '

            }
            console.log(A);
        }

        await swap();
        await output();
    } catch (error) {
        console.log(error);
    }

}

swapLetter();
// console.log(letter);