
// prints ✅ if the (perdiction) was right 
// and ❌ if it was wrong
function check(label , actual , perdicted){
    const ok = Object.is(actual , perdicted);
    console.log(ok ? "✅" : "❌" ,
        label,
        "| predicted:" , perdicted,
        "| actual:" , actual
    );

}
// exp: ---toNum()
// check('toNum("")' , toNum("") , 0)
// check('toNum("20px")' , toNum("20px") , 20 )
// check('toNum("1,500")' , toNum("1,500") , 1,500 ) // actual = 1 , comma stops parseFloat

// exp: round2 => fixes the decimal problems
check("0.1 + 0.2", 0.1 + 0.2 , 0.3 ); // actual = 0.300000004
check("round2(0.1 + 0.2)" , round2(0.1 + 0.2) , 0.3)
check("round2(2.005)" ,round2(2.005) , 2.01)
check("Math.round" , Math.round(1.005 * 100) / 100 , 1.01)
check("Math.round with Number.EPSILON" , // Adding a tiny nudg evaluates to the precidted result
     Math.round((1.005 + Number.EPSILON) * 100) / 100 , 1.01)



// reduce()
const total = [10,20,30].reduce((sum , n , i) => {
    console.log("Sum so Far: " ,sum , "| next n: ",n ,"- index :" , i + 1);
    return sum + n;
} , 0)
console.log("Total: " , total)

const lines = [{lineTotal: 100} , {lineTotal: 200}];
console.log(lines.reduce((sum , l) => sum + l.lineTotal))
// with no Initialized vaule , the accumlator will start from the first element
// so it accumulates the result form the previous element/iteration
// it groups the array items into an object group

try{ [].reduce((sum , n) => sum + n)} catch(e){
    console.log(e.name + ":" + e.message);}
    // TypeError: reduce of empty array with no initialValue

try{console.log([10,20,30].reduce((sum , n) => {sum + n} , 0))
} catch(e) {
    console.log(e.name + ":" + e.message)
}

console.log([10,20,30].reduce((sum , n) => {sum + n} , 0))
