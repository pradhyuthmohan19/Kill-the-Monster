let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

const weapons=[
  {
    name:"stick",
    power:5
  },
  {
    name:"dagger",
    power:30
  },
  {
    name:"claw hammer",
    power:50
  },
  {
    name:"sword",
    power:100
  }
];

const monsters=
[
  {
    name:"slime",
    level:2,
    health:15
  },
  {
    name:"beast",
    level:8,
    health:60
  },
  {
    name:"dragon",
    level:20,
    health:300
  }
  
]

const locations=[
  {
    name:"townsqaure",
    "button text":["Go to Store","Go to cave","Fight dragon "],
    "button functions":[goStore,goCave,fightDragon],
    text:"You are in the town sqaure"

  },

  {
    name:"store",
    "button text":["Buy 10 health(10 gold)","Buy Weapon (30 gold)","Go to town sqaure "],
    "button functions":[buyHealth,buyWeapon,goTown],
    text:"You enter the store"

  },
  {
    name:"cave",
    "button text":["fight slime","fight beast","Go to town sqaure "],
    "button functions":[fightSlime,fightBeast,goTown],
    text:"You enter cave"

  },
  {
    name:"fight",
    "button text":["attack","dodge","run"],
    "button functions":[attack,dodge,goTown],
    text:"You are fighting a monster"

  },
  {
    name:"killmonster",
    "button text":["Go to town sqaure","Go to town sqaure","Go to town sqaure"],
    "button functions":[goTown,goTown,goTown],
    text:"The monster died and u won gold"

  },
  {
    name:"lose",
    "button text":["Replay??","Replay??","Replay??"],
    "button functions":[restart,restart,restart],
    text:"you died"

  },
  {
    name:"win",
    "button text":["Replay??","Replay??","Replay??"],
    "button functions":[restart,restart,restart],
    text:"you won"

  }




]

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  monsterStats.style.display="none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location["text"];
}




function goTown() {
 update(locations[0]);
}


function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}


function buyHealth() {
  if(gold>=10)
  {
  gold=gold-10;
  health=health+10;
  goldText.innerHTML=gold;
  healthText.innerHTML=health;
  }
  else
  {
    text.innerHTML="u dont have enough gold";
  }
  
}

function buyWeapon() {
    if(currentWeapon<weapons.length-1)
    {
      if(gold>=30)
    {
      gold=gold-30;
      currentWeapon++;
      gold.innerText=gold;
      let newWeapon=weapons[currentWeapon].name;
      text.innerText="You now have a " +newWeapon;
      inventory.push(newWeapon);
      text.innerText="You now have " +inventory + " in ur inventory";
    }
    else{
      text.innerText="u dont have enough gold";
    }
  }
    else{
      text.innerText="u already have powerful weapons";
      button2.innerHTML="sell weapon for 15 gold";
      button2.onclick=sellWeapon;
    }
  }


function sellWeapon()
{
  if(inventory.length>1)
  {
    gold=gold+15;
    goldText.innerHTML=gold;
    let currentWeapon=inventory.shift();
    text.innerHTML="you sold "+ currentWeapon;
    text.innerHTML="you have in inventory"+inventory;

  }
  else{
    text.innerHTML="you cant sell ur only weapon";
  }
}


function fightSlime()
{
  fighting=0;
  goFight();
}
function fightBeast()
{
  fighting=1;
  goFight();

}
function fightDragon() {
  fighting=2;
  goFight();
}

function goFight()
{
  update(locations[3]);
  monsterHealth=monsters[fighting].health;
  monsterStats.style.display="block";
  monsterNameText.innerHTML=monsters[fighting].name;
  monsterHealthText.innerHTML=monsterHealth;
}
function attack()
{
  text.innerHTML="the"+monsters[fighting].name+"attacks";
  text.innerHTML+="u attack with ur"+weapons[currentWeapon].name+".";
  health=health-monsters[fighting].level;
  monsterHealth-=weapons[currentWeapon].power+ Math.floor(Math.random()*xp)+1;
  healthText.innerHTML=health;
  monsterHealthText.innerHTML=monsterHealth;
  if(health<=0)
  {
    lose();
  }
  else if(monsterHealth<=0)
  {
    if(fighting == 2)
    {
      winGame();
    }
    else{
    defeatMonster();
    }
  }


}
function dodge()
{
  text.innerHTML="you dodged the attack from"+monsters[fighting].name+".";
}
function defeatMonster()
{
  gold=gold+Math.floor(monsters[fighting].level * 6.7);
  xp=xp+monsters[fighting].level;
  goldText.innerHTML=gold;
  xpText.innerHTML=xp;
  update(locations[4]);
}
function lose()
{
  update(locations[5]);
}
function winGame()
{
  update(locations[6]);
}
function restart()
{
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let inventory = ["stick"];
goldText.innerHTML=gold;
xpText.innerHTML=xp;
healthText.innerHTML=health;
goTown();
}





