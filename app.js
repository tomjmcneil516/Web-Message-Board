    // this is a javascript comment
    for(let i = 0; i < 10; i++){
        while(i % 2 != 1){
            console.log(i + 10);
            i++;
        }
        console.log(i);
    }

    let dog = {
        name: 'Winnie',
        breed: 'Corgi',
        age: 3,
        size: 'chonk'
    };

    let property = 'age'
    dog[property] = 1000
    console.log(dog.age);
    console.log(dog.size);

    document.getElementsByClassName("btn").onclick = printThis;

    function printThis(){
        console.log("CORGIS ARE SO CUTE");
    }

    function changeText(id) {
        id.innerHTML = "Ooops!";
        }

    printThis("HERE IS A NEW MESSAGE");
    printThis(dog.name);