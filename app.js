let hiba="";
let hibakerdojel= false;
let ev=[];

function maidatum(){
    let ma = new Date();
    let ev = ma.getFullYear();
    let honap = ma.getMonth();
    let nap = ma.getDay();
    document.getElementById("erkezesS").value = ev + ".";
    if(honap<10){
        document.getElementById("erkezesS").value +="0" + honap + ".";
    }
    else{
        document.getElementById("erkezesS").value += honap + ".";
    }
    if(nap<0){
        document.getElementById("erkezesS").value+= "0" + nap + ".";
    }
    else{
        document.getElementById("erkezesS").value += "0" +nap + "."
    }
}
maidatum();

function vizsg(){
    hiba="";
    hibakerdojel=false;
    ev=[];
    let fiatalsz=0;
    let vendeg = document.getElementById("vendsz");
    let erkezes = document.getElementById("erkezesS");
    let tavozas = document.getElementById("tavozasS");
    
    for(let i=0;i<vendeg;i++){
        ev.push(document.getElementsByClassName("evek")[i].value)
    }
    for(let i=0;i<vendeg;i++){
        if(ev[i]<16){
            fiatalsz++;
        }
    }
    if(fiatalsz==0 &&(document.getElementsByClassName("owo")[2].checked || document.getElementsByClassName("owo")[3].checked)){
        hiba += "Csak 16 év alatti vendég igényelhet pótágyat\n"
        hibakerdojel=true;
    }
    if(erkezes>tavozas){
        hiba += "Normális dátumot lecci\n"
        hibakerdojel=true;
    }
    else if(tavozas==erkezes){
        hiba += "Egy nap vagy annál többet kell igényelni\n"
        hibakerdojel=true;
    }
    if(!document.getElementsByClassName("owo")[0].checked 
    && !document.getElementsByClassName("owo")[1].checked 
    && !document.getElementsByClassName("owo")[2].checked 
    && !document.getElementsByClassName("owo")[3].checked){
        hiba +="Válassz egy szoba típust is";
        hibakerdojel=true;
    }
    if(!document.getElementsByClassName("uwu")[0].checked 
    && !document.getElementsByClassName("uwu")[1].checked 
    && !document.getElementsByClassName("uwu")[2].checked 
    && !document.getElementsByClassName("uwu")[3].checked){
        hiba +="Válassz egy ellátás típust is\n";
        hibakerdojel=true;
    }
    if(hibakerdojel){
        alert(hiba)
    }
    else{
        szamlalas(vendeg)
    }
}



function szamlalas(vendeg){
    let osszeg=0;
    
    let erkezes = new Date(document.getElementById("erkezesS").value);
    let tavozas = new Date(document.getElementById("tavozasS").value);

    let erkezesev = erkezes.getFullYear()
    let erkezesho = erkezes.getMonth()
    let erkezesnap = erkezes.getDay()
    let tavozasev = tavozas.getFullYear()
    let tavozasho = tavozas.getMonth()
    let tavozasnap = tavozas.getDay()

    let erkezesstr = erkezesev + "." + erkezesho + "."+erkezesnap +".";
    let tavozasstr = tavozasev + "." + tavozasho + "."+ tavozasnap+"."
    let minusz= tavozas.getTime()-erkezes.getTime();
    let elteltnap=Math.round(minusz / (1000 * 3600* 24))

    let szobatipus="";
    for(let i = 0; i< document.getElementsByClassName("owo").length; i++){
        if(document.getElementsByClassName("owo")[i].checked){
            if(i == 0){
                osszeg+= 9000*elteltnap
                szobatipus="Egyágyas"
            }
            else if(i ==  1){
                osszeg+= 15000 *elteltnap
                szobatipus= "Kétágyas"
            }
            else if(i==2){
                osszeg+=18000*elteltnap
                szobatipus="Kétágyas, 1 pótágy"
            }
            else{
                osszeg+=21000*elteltnap
                szobatipus="Kétágyas, 2 pótány"
            }
        }
    }
    let ellatastipus="";
    for(let i = 0; i< document.getElementsByClassName("uwu").length; i++){
        if(document.getElementsByClassName("uwu")[i].checked){
            if(i == 0){
                osszeg+= 900*elteltnap*ev.length
                ellatastipus="Reggeli"
            }
            else if(i ==  1){
                osszeg+= 2900 *elteltnap*ev.length
                ellatastipus="Félpanzió"
            }
            else{
                osszeg+=4900*elteltnap*ev.length
                ellatastipus="Teljes panzió"
            }
            
        }
    }

    let szolgalttipus="";
    for(let i = 0; i< document.getElementsByClassName("pwp").length; i++){
        if(document.getElementsByClassName("pwp")[i].checked){
            if(i == 0){
                osszeg+= 800
                szolgalttipus="Beltéri medencék"
            }
            else if(i ==  1){
                osszeg+= 800
                szolgalttipus="Kültéri medencék"
            }
            else if(i ==  2){
                osszeg+= 800
                szolgalttipus="Szauna"
            }
            
        }
    }
    if(document.getElementsByClassName("pwp")[3].checked){
        osszeg+=2000;
        szolgalttipus ="Teljes belépő"
    }
    if(szolgalttipus==""){
        szolgalttipus ="Nem igényel"
    }
    visszajelzes(osszeg,szobatipus,vendeg,ellatastipus,szolgalttipus,erkezesstr,tavozasstr);

    function visszajelzes(osszeg,szobatipus,vendeg,ellatastipus,szolgalttipus,erkezesstr,tavozasstr){
        let elegemvan = "Sikeres foglalás, a foglalás adatai: \n\n"
        elegemvan += "\nÉrkezés: " + erkezesstr + "\nTávozás: " + tavozasstr
        elegemvan += "\nSzoba: " + szobatipus
        elegemvan += "\nEllátás: " + ellatastipus
        elegemvan += "\nSzolgálatások: " + szolgalttipus
        elegemvan += "\nTeljes összeg: " + osszeg + "Ft."
        alert(elegemvan)
    }

}