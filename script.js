
let original=[8,3,5,1,9,6,2];

let data=[...original];

let steps=[];

let currentStep=0;

let interval=null;

function drawBars(arr,active=[]){

    const container=document.getElementById("bars");

    container.innerHTML="";

    arr.forEach((value,index)=>{

        const bar=document.createElement("div");

        bar.classList.add("bar");

        if(active.includes(index)){
            bar.classList.add("active");
        }

        bar.style.height=(value*25)+"px";

        bar.textContent=value;

        container.appendChild(bar);
    });
}

function generateSteps(){

    steps=[];

    let arr=[...data];

    for(let i=1;i<arr.length;i++){

        let key=arr[i];

        let j=i-1;

        while(j>=0 && arr[j]>key){

            steps.push({
                array:[...arr],
                active:[j,j+1],
                text:`Bandingkan ${arr[j]} dengan ${key}`
            });

            arr[j+1]=arr[j];

            j--;
        }

        arr[j+1]=key;

        steps.push({
            array:[...arr],
            active:[j+1],
            text:`Sisipkan ${key} pada posisi yang benar`
        });
    }

    steps.push({
        array:[...arr],
        active:[],
        text:"Data berhasil diurutkan"
    });
}

function nextStep(){

    if(currentStep>=steps.length){
        return;
    }

    let step=steps[currentStep];

    drawBars(step.array,step.active);

    document.getElementById("stepInfo").innerHTML=
    "Langkah : "+(currentStep+1);

    document.getElementById("description").innerHTML=
    step.text;

    currentStep++;
}

function autoPlay(){

    pausePlay();

    interval=setInterval(()=>{

        if(currentStep>=steps.length){

            clearInterval(interval);

            return;
        }

        nextStep();

    },1200);
}

function pausePlay(){

    clearInterval(interval);
}

function shuffleData(){

    data.sort(()=>Math.random()-0.5);

    currentStep=0;

    drawBars(data);

    generateSteps();

    document.getElementById("description").innerHTML=
    "Data telah diacak.";

    document.getElementById("stepInfo").innerHTML=
    "Langkah : 0";
}

function resetData(){

    data=[...original];

    currentStep=0;

    drawBars(data);

    generateSteps();

    document.getElementById("description").innerHTML=
    "Data dikembalikan ke kondisi awal.";

    document.getElementById("stepInfo").innerHTML=
    "Langkah : 0";

    pausePlay();
}

drawBars(data);

generateSteps();