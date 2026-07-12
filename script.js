// ===============================
// Sidebar Toggle
// ===============================

const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");

menu.addEventListener("click", () => {

    sidebar.classList.toggle("hide");

});

// ===============================
// Vote Buttons
// ===============================

const voteButtons = document.querySelectorAll(".card button");

let voted = false;

voteButtons.forEach((button)=>{

    button.addEventListener("click",()=>{

        if(voted){

            alert("You have already voted!");

            return;
        }

        let confirmVote = confirm("Are you sure you want to vote for this candidate?");

        if(confirmVote){

            voted = true;

            button.innerHTML = "✔ Voted";

            button.style.background="#16a34a";

            voteButtons.forEach(btn=>{

                btn.disabled=true;

                btn.style.opacity=".6";

            });

            button.disabled=false;

            button.style.opacity="1";

            alert("Thank You! Your vote has been recorded.");

        }

    });

});

// ===============================
// Notification Icon
// ===============================

document.querySelector(".bi-bell").addEventListener("click",()=>{

    alert("No new notifications.");

});

// ===============================
// Profile Icon
// ===============================

document.querySelector(".bi-person-circle").addEventListener("click",()=>{

    alert("Profile Page Coming Soon!");

});

// ===============================
// Sidebar Menu Active
// ===============================

const menuItems=document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(li=>{

            li.classList.remove("active");

        });

        item.classList.add("active");

    });

});

// ===============================
// Card Hover Animation
// ===============================

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-12px) scale(1.03)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px) scale(1)";

    });

});

// ===============================
// Welcome Message
// ===============================

window.onload=()=>{

    console.log("Indian Voting System Loaded Successfully");

};