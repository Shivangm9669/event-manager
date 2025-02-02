document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");
  const eventForm = document.getElementById("eventForm");
  const eventTableBody = document.getElementById("eventTableBody");
  const storage = localStorage;
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");
  const editIndex = document.getElementById('editIndex');
  const toast = document.getElementById('toast');
  const contactForm = document.getElementById("contactForm");

  let events = JSON.parse(storage.getItem("events") || '[]');

  function showToast(message, type = "success") {
    toast.textContent=message;
    toast.style.backgroundColor= type === 'success' ? '#28a745' : '#dc3545';
    toast.style.display='block';
    setTimeout(() =>{
        toast.style.display='none';
    }, 3000)
  }

  function saveEvents() {
    storage.setItem("events", JSON.stringify(events));
  }

  function renderEvents() {
    console.log("helo i here");
    eventTableBody.innerHTML = "";
    events.forEach((event, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${new Date(event.dateTime).toLocaleString()}</td>
            <td class="action-buttons">
                <button onclick="editEvent(${index})" class="btn-edit">Edit</button>
                <button onclick="deleteEvent(${index})" class="btn-delete">Delete</button>
            </td>
        `;
        // console.log(row.innerHTML);
      eventTableBody.appendChild(row);
    //   console.log(eventTableBody);
    });
  }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();     
        console.log("hello");
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();    
        if (name === "" || email === "" || message === "") {
            alert("Please fill out all fields.");
            return;
        }   
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }   
        console.log("Form Submitted", { name, email, message });
        alert("Thank you for your message!");
        contactForm.reset();
    }); 

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
  window.editEvent = function(index){
    const event = events[index];
    document.getElementById('eventName').value=event.name;
    document.getElementById('eventDescription').value=event.description;
    document.getElementById('eventDateTime').value=event.dateTime;

    editIndex.value=index;
    formTitle.textContent='Edit Event';
    submitBtn.textContent='Update Event';
    window.scroll({top : 0 , behavior : "smooth"});
    
  };

  window.deleteEvent=function(index){
    if(confirm('Are you sure you want to delete this event?')){
        events.splice(index , 1);
        saveEvents();
        renderEvents();
        showToast("Event deleted Sucessfully");
    }
        
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute("data-section");

      sections.forEach((section) => section.classList.remove("active"));
      navLinks.forEach((navLink) => navLink.classList.remove("active"));

      document.getElementById(targetSection).classList.add("active");
      link.classList.add("active");
    });
  });

  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(events);
    const eventName = document.getElementById("eventName").value;
    const eventDescription = document.getElementById("eventDescription").value;
    const dateTime = document.getElementById("eventDateTime").value;

    // if (eventName == "") {
    // }

    // if (eventDecription == "") {
    // }

    // if (dateTime == "") {
    // }

    const row = {
        name : eventName,
        description: eventDescription,
        dateTime : dateTime
    };


    if(editIndex.value===''){
        
        events.push(row);
    }
    else{
        events[editIndex.value]=row;
        formTitle.textContent='Create Event';
        submitBtn.textContent='Add';
        editIndex.value='';
        showToast('Event Created SuccessFully');
    }
    saveEvents();
    renderEvents();
    eventForm.reset();
  });

  renderEvents();
});
