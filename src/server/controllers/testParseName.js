
const filename = 'img-a364a569-bd35-47c6-b033-e2765b09e1a0-12-1.png';
function findStop(str){
    const dot = str.indexOf(".");
    let count = 0;
    for (let i = dot; i>=0; i--){
        if (str[i] === "-") {
            count += 1;
            if (count === 2) {
                return i
            }
        }
    }
}
const stop = findStop(filename);

const job_id = filename.substring(4,stop);
console.log("job_id",job_id)