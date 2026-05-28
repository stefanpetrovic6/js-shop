

$(document).ready(function(){


AjaxCallBack("products.json",ispisProporuka);

AjaxCallBack("products.json",ispisiTelefone);
AjaxCallBack("products.json",function(data){


    setItemLS("telefoni",data);

})



AjaxCallBack("brendovi.json",function(data){

ispisChk(data,"Brendovi","brendovi");



})
AjaxCallBack("tipekrana.json",function(data){

    ispisChk(data,"Ekrani","ekrani");
    
    
    
    })

    AjaxCallBack("boje.json",function(data){

        ispisChk(data,"Boje","boje");
        
        
        
        })


        AjaxCallBack("meni.json",function(data){

           ispisiNavigaciju(data);
            
            
            
            })

//Dinamicko ispisivanje Navigacije
function ispisiNavigaciju(data){


let dohv=$("#stefan-ul")

let html="";
for(let i of data){

html+=` <a class="nav-link" href="${i.href}">${i.ime}</a>`



}


dohv.html(html);





}




    //Funkacija za ispisivanje preporucenih sadrzaja
function ispisProporuka(data){



    var dohvati=$("#sadrzaj-preporuka");
  
    var html="";

for(let i of data){

    if(i.preporuceno){
html+=`<div class="card bg-light mt-3" style="width: 18rem;">
<img src="${i.href}" class="card-img-top" alt="slikatelefoni${i.naziv}">
<div class="card-body">
  <h5 class="card-title">${i.naziv}</h5>
  <hr/>
  <p class="staracena">Stara Cena:${i.staracena} RSD </p>
  <p class="novacena fs-4">${i.trenutnacena} RSD</p>
  <a href="prodavnica.html" class="btn btn-secondary"> Pogledaj Više..</a>
</div>
</div>`
        
    }
}


dohvati.html(html);




}





//AjaxCallBack


function AjaxCallBack(putanja,result){
$.ajax({
url:putanja,
method:"get",
dataType:"json",
success:result,
error:function(xhr){console.log(xhr);}





})



}

//funkcija za dinamičko ispisivanje chekova
function ispisChk(data,prikaz,div){

   

var dohvati2=$(`#${div}`)

html=`<h4>${prikaz}</h4>`
html+="<hr/>"

for(let i of data){
    
html+=`
<div class="s-1">


<input type="checkbox" " class="${prikaz}" value="${i.id}"/> 
<label class="fs-5" for="${i.naziv}">${i.naziv}</label>
<p id="${i.naziv}"></p>
</div>


`

}

dohvati2.html(html);

//Funkcija za Filtriranje po brendu
function BrendFilter(data){

    var izabrani=[];
    let rezovi=[];
    $(".Brendovi:checked").each(function(el){
        izabrani.push(parseInt($(this).val()))
    })
   
if(izabrani.length!=0){
    console.log(izabrani);
    
  return data.filter(x=>izabrani.includes(x.brend));
}

else{

    return data;
}

}

function EkraniFilter(data){
    var izabrani=[];
    let rezovi=[];
    $(".Ekrani:checked").each(function(el){
        izabrani.push(parseInt($(this).val()))
    })
   
if(izabrani.length!=0){
    console.log(izabrani);
    
  return data.filter(x=>izabrani.includes(x.tipEkrana));
}

else{

    return data;
}
    
 
}
function BojeFilter(data){
    var izabrani=[];
    let rezovi=[];
    $(".Boje:checked").each(function(el){
        izabrani.push(parseInt($(this).val()))
    })
   
if(izabrani.length!=0){
    console.log(izabrani);
    
  return data.filter(x=>izabrani.includes(x.boja));
}

else{

    return data;
}
 
}



$(".Brendovi").change(function(){

    var dohv=getItemLS("telefoni");
prikazi(dohv);



    
})


$(".Ekrani").change(function(){
    
    var dohv=getItemLS("telefoni");
    prikazi(dohv)



})
$(".Boje").change(function(){
    
    var dohv=getItemLS("telefoni");
    prikazi(dohv)



})

$("#sortiraj").change(function(){
    
    var dohv=getItemLS("telefoni");
    prikazi(dohv)



})



function prikazi(data){
  data=BrendFilter(data)
data=EkraniFilter(data);
data=BojeFilter(data);

data=sortiraj(data);
ispisiTelefone(data);


}

function sortiraj(data){

let vr=$("#sortiraj").val();

if(vr=="CenaRastuce"){

return data.sort((a,b)=>a.trenutnacena<b.trenutnacena?-1:1);



}
else{
    return data.sort((a,b)=>a.trenutnacena<b.trenutnacena?1:-1);


}




}




}



//funkcija za ispisivanje Telefona


function ispisiTelefone(data){


    

var dohvatitel=$(".stefan-fon");
let html="";




for(let i of data){

    html+=`  <div class="col-lg-4 mt-4">
    <div class="card bg-light" >
        <img src="${i.href}" class="card-img-top" alt="slika-telefoni${i.naziv}">
        <div class="card-body">
          <h5 class="card-title">${i.naziv}</h5>
          <hr/>
          <p class="staracena">Stara Cena:${i.staracena} RSD </p>
          <p class="novacena fs-4">${i.trenutnacena} RSD</p>
         <button class="dugme-korpa" onClick="stefanbre(${i.id})" > <a  class="btn btn-secondary" id="${i.id}"  > <i class="fa-solid mx-2 fa-cart-shopping"></i>Dodaj u korpu</a></button>
        </div>
        </div>
</div>`



}




dohvatitel.html(html);



$(".dugme-korpa").click(function(){

this.innerHTML=`<a href="#" class="btn btn-success" id="2"  > <i class="fa-solid mx-2 fa-cart-shopping"></i>Dodaj još jedan</a>`




})




($(".card")).click(function(){

    
    
    
    
    })




}

})

//Ukoliko postoji ls, obrisi ga


function obrisiStorage(){

var aj=localStorage.getItem("filtirani");


if(aj!=null){
localStorage.removeItem("filtirani");

}



}

//Dohvatanje i kreiranja LocalStorage-a
function setItemLS(naziv,vrednost){

    localStorage.setItem(naziv,JSON.stringify(vrednost));
    
    
    
    
    
    }


    
    function getItemLS(naziv){
    
    return JSON.parse(localStorage.getItem(naziv))
    
    }

    

//Funkcija za kreiranje korpe u LocalStorage

function stefanbre(id){

var vr=getItemLS("korpa");

var nadji=getItemLS("telefoni");
if(vr!=null){


    

for(let i of vr){

if(i.id==id){

i.kolicina+=1;
i.cena=i.cena*i.kolicina;

setItemLS("korpa",vr);



$("#kolicina").html(vr.length);

return

}




}
}





var aj=nadji.filter(x=>x.id==id);

var cena=aj[0].trenutnacena;



var objekat={
"id":id,
"kolicina":1,
"cena":cena



}



if(vr!=null){
vr.push(objekat);

$("#kolicina").html(vr.length);


setItemLS("korpa",vr);
}
else{
    niz=[];
    niz.push(objekat);
    $("#kolicina").html(niz.length);

    setItemLS("korpa",niz);
}







    
}

//Funkcija za prikaz korpe

function kreirajkorpu(){

var items=getItemLS("korpa");

var duzina=items.length

if(duzina<1){

    let ispis="<h2>Korpa je prazna!</h2>"

  $("#stefan-prazna").html(ispis)
}


var telefoni=getItemLS("telefoni");
console.log(items);

var proizvodifinal=[];


for(let i of telefoni){

for(let o of items){

if(i.id==o.id){

    let obj={
"id":i.id,
"href":i.href,
"kolicina":o.kolicina,
"cena":o.cena,
"naziv":i.naziv


    }

proizvodifinal.push(obj);



}



}






}

console.log(proizvodifinal);









let html="";
html+=`<table class="table table-image">
<thead>
  <tr>
    <th scope="col">Broj</th>
    <th scope="col">Slika</th>
    <th scope="col">Ime</th>
    <th scope="col">Cena</th>
    <th scope="col">Kolicina</th>
    <th scope="col">Izbrisi</th>
 
  </tr>
</thead>`

html+="<tbody>"






var redni=1;




for(let i of proizvodifinal){



    

html+=` <tr>
<th scope="row">${redni}</th>
<td class="w-25">
    <img src="${i.href}" class=" img-thumbnail" alt="Sheep">
</td>
<td>${i.naziv}</td>
<td>${i.cena}</td>
<td>${i.kolicina}</td>
<td><button onClick="stefanbrisanje(${i.id})"> <i class="fa-solid fa-trash"></i><button></td>
</tr>`




redni++;


}

html+=` </tbody>
</table>   `

$("#korpa-korpa").html(html);


}
kreirajkorpu();
function stefanbrisanje(id){

var proba=getItemLS("korpa");
var novi2=proba.filter(x=>x.id!=id);
setItemLS("korpa",novi2);
kreirajkorpu();
ukupno();



}


function ukupno(){
var pro=getItemLS("korpa");

let cena=0;

for(let i of pro){
cena+=i.cena;




}



$("#stefan-ukupno").html(cena);




}
ukupno();



function obrisisve(){
    setItemLS("korpa",[]);
    kreirajkorpu();
}

//Provera Forme 
reIme=/^[A-ZŠĐŽĆČ][a-zšđžćč]{2,15}(\s[A-ZŠĐŽĆČ][a-zšđžćč]{2,15}){0,2}$/
rePrezime=/^[A-ZŠĐŽĆČ][a-zšđžćč]{2,15}(\s[A-ZŠĐŽĆČ][a-zšđžćč]{2,15}){0,2}$/
reMail=/^[a-z]((\.|-|_)?[a-z0-9]){2,}@[a-z]((\.|-|_)?[a-z0-9]+){2,}\.[a-z]{2,6}$/
reAdresa=/^[A-Z a-z 0-9]{3,15}$/


function provera(){
var mail=$("#mail").val();
var ime=$("#ime").val();
var adresa=$("#adresa").val();
var ddl=$("#stefan-pada").val();
var chk=$("#saglasnost");

var greska=0;

if(!reMail.test(mail)){

   greska++;

$("#greska-mail").html("Morate uneti mail u formatu stefan@gmail.com")


}
else{

    $("#greska-mail").html("")


}


if(!reIme.test(ime)){

    greska++;
 
 $("#greska-ime").html("Ime mora poceti Velikim slovom")
 
 
 }
 else{
    $("#greska-ime").html("")



 }


if(!reAdresa.test(adresa)){
 
    $("#greska-adresa").html("Morate uneti adresu")
    greska++;

}
else{
    $("#greska-adresa").html("")


}


if(ddl==0){
    $("#greska-ddl").html("Morate izabrati grad")
    greska++;


}
else{

    $("#greska-ddl").html("")

}


if(!chk.is(":checked")){
    $("#greska-chk").html("Morate biti saglasni ")
    greska++;
}

else{
    $("#greska-chk").html(" ")


}

if(greska==0){

    setItemLS("korpa",[]);
    

    $("#uspeh").html("Uspesno ste naručili proizvod")

}
else{
    $("#uspeh").html(" ")


}

    
}