let skillsSet = new Set();
let globalJobTitleId = null;
let globalButtonSelector = true; //t for add title, f for edit title
document.addEventListener('DOMContentLoaded', function() {

if (window.location.pathname.includes('index.html')){
// Tab functionality
    const tab1 = document.getElementById('tab1');
    const tab2 = document.getElementById('tab2');
    const tab1Content = document.getElementById('tab1-content');
    const tab2Content = document.getElementById('tab2-content');

    tab1.addEventListener('click', function() {
        tab1.classList.add('open');
        tab1.classList.remove('closed');
        tab2.classList.add('closed');
        tab2.classList.remove('open');
        tab1Content.classList.add('active');
        tab2Content.classList.remove('active');
    });

    tab2.addEventListener('click', function() {
        tab2.classList.add('open');
        tab2.classList.remove('closed');
        tab1.classList.add('closed');
        tab1.classList.remove('open');
        tab2Content.classList.add('active');
        tab1Content.classList.remove('active');
    });

    // Initialize the first tab as active
    tab1.click();

    // Popup functionality
    document.getElementById('popup').addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Prevent closing the popup when clicking outside
    document.getElementById('overlay').addEventListener('click', function() {
        closePopup();
    });
}
    

});

function redirectTo(url) {
    window.location.href = url;
}

/*Sidebar Nav*/
function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.classList.toggle("closed");
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle("open");
    }
}

/*Toggle Button*/
function toggle(element) {
    const openOption = document.querySelector('.toggle-option.open');
    const closedOption = document.querySelector('.toggle-option.closed');
    openOption.classList.toggle('open');
    openOption.classList.toggle('closed');
    closedOption.classList.toggle('open');
    closedOption.classList.toggle('closed');
}

function showInfo(candidate) {
    // Display the popup
    document.getElementById('info').style.display = 'block';
    document.getElementById('info').classList.add('show');
    document.getElementById('overlay').classList.add('show');

    // Populate the popup fields with candidate information
    document.querySelector('.candidate-header h2').textContent = `${candidate.fname} ${candidate.lname}`;
    document.querySelector('.locationemail i.fa-map-pin + h4').textContent = candidate.location || 'Location not available';
    document.querySelector('.locationemail i.fa-envelope + h4').textContent = candidate.email || 'Email not available';
    document.querySelector('.locationemail i.fa-venus-mars + h4').textContent = candidate.gender || 'Gender not available';
    document.querySelector('.locationemail i.fa-phone + h4').textContent = candidate.phone || 'Phone not available';
    document.querySelector('.locationemail i.fa-birthday-cake + h4').textContent = candidate.birthday || 'Birthday not available';
    
    // Personal information
    document.getElementById('personal-desc').textContent = candidate.personal_description || 'No personal description available';

    // Profile picture
    const profileImage = document.querySelector('.large-profile-photo');
    if (candidate.profile_image) {
        // Assuming profile_image is stored as Base64 or a URL
        profileImage.src = `data:image/jpeg;base64,${candidate.profile_image}`; // or just `${candidate.profile_image}` if it's a URL
    } else {
        profileImage.src = 'img/user.svg'; // Default profile picture
    }

     // Populate past job experience
     const pastJobsContainer = document.getElementById('past-jobs-list');
     pastJobsContainer.innerHTML = ''; // Clear any previous job entries
 
     if (candidate.past_jobs && candidate.past_jobs.length > 0) {
         candidate.past_jobs.forEach(job => {
             const jobItem = document.createElement('li');
             jobItem.innerHTML = `${job.job_title} at ${job.company_name} (${job.year_started} - ${job.year_ended})`;
             pastJobsContainer.appendChild(jobItem);
         });
     } else {
         const noJobsItem = document.createElement('li');
         noJobsItem.textContent = 'No past jobs record available';
         pastJobsContainer.appendChild(noJobsItem);
     }

     // Populate education information
    const educationContainer = document.getElementById('education-list');
    educationContainer.innerHTML = ''; // Clear any previous education entries

    if (candidate.education && (candidate.educational_attainment || candidate.education.course || candidate.education.school || candidate.education.sy_started || candidate.education.sy_ended)) {
        const educationItem = document.createElement('li');
        educationItem.innerHTML = `${candidate.education.educational_attainment} in ${candidate.education.course} from ${candidate.education.school} (${candidate.education.sy_started} - ${candidate.education.sy_ended})`;
        educationContainer.appendChild(educationItem);
    } else {
        const noEducationItem = document.createElement('li');
        noEducationItem.textContent = 'No education information available';
        educationContainer.appendChild(noEducationItem);
    }

    // Populate vocational training information
    const vocationalContainer = document.getElementById('vocational-list');
    vocationalContainer.innerHTML = ''; // Clear any previous vocational entries

    if (candidate.vocational && (candidate.vocational.course || candidate.vocational.school || candidate.vocational.year_started || candidate.vocational.year_ended)) {
        const vocationalItem = document.createElement('li');
        vocationalItem.innerHTML = `${candidate.vocational.course} from ${candidate.vocational.school || 'N/A'} (${candidate.vocational.year_started || 'N/A'} - ${candidate.vocational.year_ended || 'N/A'})`;
        vocationalContainer.appendChild(vocationalItem);
    } else {
        const noVocationalItem = document.createElement('li');
        noVocationalItem.textContent = 'No vocational information available';
        vocationalContainer.appendChild(noVocationalItem);
    }

    // Populate skills information
    const skillsContainer = document.getElementById('skills-list');
    skillsContainer.innerHTML = ''; // Clear any previous skills entries

    if (candidate.skills && candidate.skills.length > 0) {
        candidate.skills.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.textContent = skill; // Each skill is displayed as text
            skillsContainer.appendChild(skillItem);
        });
    } else {
        const noSkillsItem = document.createElement('li');
        noSkillsItem.textContent = 'No skills available';
        skillsContainer.appendChild(noSkillsItem);
    }

    // Clean license name before displaying
    const cleanLicenseName = (name) => {
        return name.replace(/\\'/g, "'").replace(/\\\\/g, ""); // Replace backslashes and escaped quotes
    };

   // Populate licenses information
   const licensesContainer = document.getElementById('licenses-list');
   licensesContainer.innerHTML = ''; // Clear previous entries

   if (candidate.licenses && candidate.licenses.length > 0) {
       candidate.licenses.forEach((license, index) => {
           const licenseItem = document.createElement('li');

           // Create a span to hold the license text
           const licenseText = document.createElement('span');
           licenseText.innerText = `${cleanLicenseName(license.license_name)} (${license.month_issued || 'N/A'} ${license.year_issued || ''} - ${license.month_expired || 'N/A'} ${license.year_expired || ''})`;
           licenseItem.appendChild(licenseText); 

           // Create a clickable icon for viewing
           const viewIcon = document.createElement('a');
           viewIcon.href = `view_license.php?userid=${candidate.userid}&licenseIndex=${index}`; 
           viewIcon.target = '_blank'; // Open in a new tab
           
           const icon = document.createElement('i');
           icon.className = 'fas fa-eye'; 
           icon.style.fontSize = '1.2em'; 
           icon.style.marginLeft = '10px'; 
           icon.title = 'View License'; 
           icon.style.color = '#2c1875';

           viewIcon.appendChild(icon);
           licenseItem.appendChild(viewIcon); 

           licensesContainer.appendChild(licenseItem);
       });
   } else {
       licensesContainer.innerHTML = '<li>No licenses available</li>';
   }

    // Display resume
    const resumeDisplay = document.getElementById('resume-display');
    const noResumeMessage = document.getElementById('no-resume-message');

    if (candidate.resume) {
        resumeDisplay.src = `data:application/pdf;base64,${candidate.resume}`;
        resumeDisplay.style.display = 'block';
        noResumeMessage.style.display = 'none'; 
    } else {
        resumeDisplay.src = ''; 
        resumeDisplay.style.display = 'none';
        noResumeMessage.style.display = 'block';
    }

    //Approve Application button
    const approveButton = document.createElement('button');
    approveButton.className = 'button-apply';
    approveButton.textContent = 'Approve Application';

    approveButton.onclick = () => approveApplication(candidate.userid, candidate.job_id);

    //RejectApplication button
    const rejectButton = document.createElement('button');
    rejectButton.className = 'button-reject';
    rejectButton.textContent = 'Reject Application';

    rejectButton.onclick = () => showDialogReject(candidate.userid, candidate.job_id);

    
    const buttonsContainer = document.getElementById('buttons-container');
    buttonsContainer.innerHTML = ''; 
    buttonsContainer.appendChild(approveButton);
    buttonsContainer.appendChild(rejectButton);
}

function showInfoCandidate(candidate) {
    // Display the popup
    console.log(candidate);
    document.getElementById('info').style.display = 'block';
    document.getElementById('info').classList.add('show');
    document.getElementById('overlay').classList.add('show');

    // Populate the candidate's basic information
    document.querySelector(".candidate-header h2").innerText = candidate.full_name || "No name available";
    document.querySelector(".locationemail:nth-of-type(1) h4").innerText = candidate.location || "No location available";
    document.querySelector(".locationemail:nth-of-type(2) h4").innerText = candidate.email || "No email available";
    document.querySelector(".locationemail:nth-of-type(3) h4").innerText = candidate.gender || "No gender specified";
    document.querySelector(".locationemail:nth-of-type(4) h4").innerText = candidate.phone || "No phone number available";
    document.querySelector(".locationemail:nth-of-type(5) h4").innerText = candidate.birthday || "No birthday specified";

    // Populate the personal description
    document.getElementById("personal-desc").innerText = candidate.personal_description || "No description available";

    // Display the profile image
    const profileImageDiv = document.getElementById("profile-image");
    profileImageDiv.innerHTML = ''; // Clear previous image

    const defaultImageUrl = 'img/user.svg'; // Set the path to your default image
    const profileImage = candidate.profile_image ? `data:image/jpeg;base64,${candidate.profile_image}` : defaultImageUrl;

    const imgElement = document.createElement('img');
    imgElement.src = profileImage;
    imgElement.alt = "Profile Image";
    imgElement.style.height = '200px'; // Set fixed height
    imgElement.style.objectFit = 'cover'; // Maintain aspect ratio
    profileImageDiv.appendChild(imgElement);


    // Populate Past Jobs
    const pastJobsList = document.getElementById("past-jobs-list");
    pastJobsList.innerHTML = ''; // Clear previous entries

    if (candidate.past_jobs && candidate.past_jobs.length > 0) {
        // Split the concatenated string into individual job entries
        const pastJobsArray = candidate.past_jobs.split('; '); // Split based on the separator used in the query

        pastJobsArray.forEach(job => {
            const pastJobItem = document.createElement('li');
            pastJobItem.innerText = job; // Set the inner text to the individual job entry
            pastJobsList.appendChild(pastJobItem); // Append the item to the list
        });
    } else {
        pastJobsList.innerHTML = '<li>No past job information available</li>';
    }   

    // Populate Education
    const educationList = document.getElementById("education-list");
    educationList.innerHTML = ''; // Clear previous entries
    if (candidate.educational_attainment) {
        const educationItem = document.createElement('li');
        educationItem.innerText = `${candidate.educational_attainment} in ${candidate.educational_course} from ${candidate.educational_school} (${candidate.sy_started} - ${candidate.sy_ended})`;
        educationList.appendChild(educationItem);
    } else {
        educationList.innerHTML = '<li>No educational information available</li>';
    }

    // Populate Vocational
    const vocationalList = document.getElementById("vocational-list");
    vocationalList.innerHTML = ''; // Clear previous entries
    if (candidate.vocational_course) {
        const vocationalItem = document.createElement('li');
        vocationalItem.innerText = `${candidate.vocational_course} from ${candidate.vocational_school} (${candidate.vocational_year_started} - ${candidate.vocational_year_ended})`;
        vocationalList.appendChild(vocationalItem);
    } else {
        vocationalList.innerHTML = 'No vocational information available</li>';
    }

    // Populate Skills
    const skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = ''; // Clear previous entries
    if (candidate.skills) {
        // Use a Set to avoid duplicates
        const uniqueSkills = new Set(candidate.skills.split(', '));
        uniqueSkills.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.innerText = skill;
            skillsList.appendChild(skillItem);
        });
    } else {
        skillsList.innerHTML = '<li>No skills available</li>';
    }

    // Populate Licenses
    const licensesList = document.getElementById("licenses-list");
    licensesList.innerHTML = ''; // Clear previous entries

    if (candidate.licenses && candidate.licenses.length > 0) {
        const licensesArray = candidate.licenses.split('; '); 

        licensesArray.forEach((license, index) => {
            const licenseItem = document.createElement('li');
            
            // Create a span to hold the license text
            const licenseText = document.createElement('span');
            licenseText.innerText = license;
            licenseItem.appendChild(licenseText); 

            // Create a clickable icon for viewing
            const viewIcon = document.createElement('a');
            viewIcon.href = `view_license.php?userid=${candidate.userid}&licenseIndex=${index}`; 
            viewIcon.target = '_blank'; // Open in a new tab
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-eye'; 
            icon.style.fontSize = '1.2em'; 
            icon.style.marginLeft = '10px'; 
            icon.title = 'View License'; 
            icon.style.color = '#2c1875'

            viewIcon.appendChild(icon);
            licenseItem.appendChild(viewIcon); 

            licensesList.appendChild(licenseItem);
        });
    } else {
        licensesList.innerHTML = '<li>No licenses available</li>';
    }
    
   // Populate Resume
   const resumeDisplay = document.getElementById("resume-display");
   const noResumeMessage = document.getElementById("no-resume-message");
   if (candidate.resume) {
       resumeDisplay.src = `data:application/pdf;base64,${candidate.resume}`; 
       resumeDisplay.style.display = 'block';
       noResumeMessage.style.display = 'none';
   } else {
       resumeDisplay.style.display = 'none';
       noResumeMessage.style.display = 'block';
   }
}

function hideInfo() {
    document.getElementById('info').style.display = 'none';
    document.getElementById('info').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
}

/*Dialog Box*/
function showDialog() {
    document.getElementById('dialogBox').style.display = 'block';
    document.getElementById('dialogBox').classList.add('show');
    document.getElementById('overlay').classList.add('show');

    document.getElementById('addpartners-company-name').value = '';
    document.getElementById('addpartners-industry').value = '';
    document.getElementById('addpartners-location').value = '';
    document.getElementById('addpartners-company-description').value = '';
}

function hideDialog() {
    document.getElementById('dialogBox').style.display = 'none';
    document.getElementById('dialogBox').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');

    // Reset the logo preview
    const logoPreview = document.getElementById('logo-preview');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const logoUpload = document.getElementById('logo-upload');
    
    logoPreview.style.display = 'none';
    logoPreview.src = '';
    uploadPlaceholder.style.display = 'flex';
    logoUpload.value = ''; // Clear the file input
}

function showEmployeeDialog() {
    document.getElementById('dialogBox').style.display = 'block';
    document.getElementById('dialogBox').classList.add('show');
    document.getElementById('overlay').classList.add('show');

    document.getElementById('addemployees-firstname').value = '';
    document.getElementById('addemployees-lastname').value = '';
    document.getElementById('addemployees-userid').value = '';
    document.getElementById('addemployees-password').value = '';
    document.getElementById('addemployees-admin-password').value = '';
}

function hideEmployeeDialog() {
    document.getElementById('dialogBox').style.display = 'none';
    document.getElementById('dialogBox').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
}

/*Dialog Box Delete*/
function showDialogDelete() {
    document.getElementById('dialogBox-delete').style.display = 'block';
    document.getElementById('overlay').classList.add('show');
}

function hideDialogDelete() {
    document.getElementById('dialogBox-delete').style.display = 'none';
    document.getElementById('overlay').classList.remove('show');
}

function showDialogDeleteJob(delJobId) {
    deleteJobId = delJobId; // Store the job ID for later use
    document.getElementById('dialogBox-delete-job').style.display = 'block'; // Show the dialog
    document.getElementById('overlay').classList.add('show'); // Show overlay
}

function hideDialogDeleteJob() {
    document.getElementById('dialogBox-delete-job').style.display = 'none'; // Hide the dialog
    document.getElementById('overlay').classList.remove('show'); // Hide overlay
}

function showDialogDeletePartner(partnerId) {
    deletePartnerId = partnerId;
    document.getElementById('dialogBox-delete').style.display = 'block';
    document.getElementById('overlay').classList.add('show');
}

function hideDialogDeletePartner(partnerId) {
    document.getElementById('dialogBox-delete').style.display = 'none';
    document.getElementById('overlay').classList.remove('show');
}

/*Dialog Box Edit*/
function showDialogEdit() {
    document.getElementById('dialogBox-edit').style.display = 'block';
}

function hideDialogEdit() {
    document.getElementById('dialogBox-edit').style.display = 'none';
}

function showDialogReject(userId, jobId) {
    document.getElementById('dialogBox-reject').style.display = 'block';
    document.getElementById('dialogBox-reject').classList.add('show');
    document.getElementById('overlay2').classList.add('show');

    const rejectButton = document.querySelector('.rejected-save-button');

    // Reset the event listener to avoid duplicates
    rejectButton.onclick = null; 
    rejectButton.onclick = () => {
        const remarks = document.getElementById('rejected-remarks').value.trim();

        if (!remarks) {
            alert('Please provide remarks for rejection.');
            return;
        }

        rejectApplication(userId, jobId, remarks);
    };
}

function hideDialogReject() {
    document.getElementById('dialogBox-reject').style.display = 'none';
    document.getElementById('dialogBox-reject').classList.remove('show');
    document.getElementById('overlay2').classList.remove('show');

    // Clear remarks input for a clean slate
    document.getElementById('rejected-remarks').value = '';
}
function openThirdPopup(companyName) {
    const thirdPopup = document.getElementById('thirdPopup');
    
    // Ensure the popup is displayed
    thirdPopup.style.display = 'block';

    // Add the 'show' class to display the popup
    thirdPopup.classList.add('show');
    
    document.getElementById('overlay').classList.add('show');
    
    // Set the company name in the input field
    document.getElementById('partner-jobposting-partner-company').value = companyName;

    // Initialize pagination for the third popup
    initializePopupPagination('thirdPopup');
    
    // Populate job titles
    populatePartnerJobTitles();

    // Initialize skills input (optional, uncomment if needed)
    // initializeSkillsInput('thirdPopup', 'partner-jobposting-skills-input', 'partner-jobposting-skills-container');
}


function closeThirdPopup() {
    const thirdPopup = document.getElementById('thirdPopup');
    const overlay = document.getElementById('overlay');

    // Remove the 'show' class to hide the popup
    thirdPopup.classList.remove('show');
    overlay.classList.remove('show');

    // Ensure the popup is not interactable by setting display to none
    thirdPopup.style.display = 'none';

    // Remove all skill tags from the container but keep the input field
    const skillsContainer = document.querySelector('#thirdPopup .jobposting-skills-container');
    const skills = skillsContainer.querySelectorAll('.jobposting-skill');
    skills.forEach(skill => skillsContainer.removeChild(skill));

    // Clear the skills set
    skillsSet.clear();

    // Optionally, you might want to clear the input field as well
    // document.querySelector('#thirdPopup #third-jobposting-skills-input').value = '';
}


// Function to open a specific popup and initialize its spinner
function openPopup(popupId) {
    const popupElement = document.getElementById(popupId)
    popupElement.style.display = 'block';
    popupElement.classList.add('show');
    document.getElementById('overlay').classList.add('show');
    fetchOptions(popupId);
    populateJobTitles();
}


// Function to close a specific popup
function closePopup(popupId) {
    const popupElement = document.getElementById(popupId);
    const overlayElement = document.getElementById('overlay');
    
    // Remove the 'show' class to hide the popup
    popupElement.classList.remove('show');
    overlayElement.classList.remove('show');
    
    // Ensure the popup is not interactable by setting display to none
    popupElement.style.display = 'none';
    
    // Optionally clear skills and other form data
    /*
    const skillsContainer = document.querySelector(`#${popupId} .jobposting-skills-container`);
    const skills = skillsContainer.querySelectorAll('.jobposting-skill');
    skills.forEach(skill => skillsContainer.removeChild(skill));
    
    // Clear the skills set
    skillsSet.clear();
    */
    // Optionally, clear the input field
    // document.querySelector(`#${popupId} #${popupId}-skills-input`).value = '';
}


// Open specific popups
function openJobPostingPopup() {
    const popup = document.getElementById('popup');

    // Ensure the popup is displayed
    popup.style.display = 'block';

    // Add the 'show' class to display the popup
    popup.classList.add('show');

    openPopup('popup')
    
    // Initialize pagination for the popup
    initializePopupPagination('popup');

    // Populate job titles
    populateJobTitles();
}



function closeEditJobPopup() {
    document.getElementById('editJob-popup').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');

    // Remove all skill tags from the container but keep the input field
    const skillsContainer = document.querySelector('#edit-jobposting-skills-container');
    const skills = skillsContainer.querySelectorAll('.jobposting-skill');
    skills.forEach(skill => skillsContainer.removeChild(skill));
    
    // Clear the skills set
    skillsSet.clear();
    
    // Optionally, you might want to clear the input field as well
    document.getElementById('#edit-jobposting-skills-input').value = '';
}

function previewLogo(event) {
    const input = event.target;
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const preview = document.getElementById('logo-preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            document.getElementById('upload-placeholder').style.display = 'none';
        };
        
        reader.readAsDataURL(file);
    }
}


function previewEditLogo(event) {
    const input = event.target;
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const preview = document.getElementById('edit-logo-preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            document.getElementById('edit-upload-placeholder').style.display = 'none';
        };
        
        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;

    /*if (currentPage.includes('rejected.php')) {
        fetchData('fetch_rejects.php', populateRejectsTable);
    } else*/ if (currentPage.includes('employees.php')){
        fetchData('fetch_employees.php', populateEmployeesTable)
    } else if (currentPage.includes('partners.php')){
        fetchData('fetch_partners.php', populatePartnersTable)
    } else if(document.querySelector('.container-calendar')){
        displaySchedule();
    } else if (currentPage.includes('index.html')) {
        fetchJobCounts();
        //Show Open Tab as default
        fetchJobsByStatus('Open');
        
        //Changes data based on active tab
        document.getElementById('tab1').addEventListener('click', function() {
            fetchJobsByStatus('Open');
        });

        document.getElementById('tab2').addEventListener('click', function() {
            fetchJobsByStatus('Closed');
        }); 
    } 
});

// Define an array to store events
let events = [];

// letiables to store event input fields and reminder list
let eventDateInput =
    document.getElementById("eventDate");
let eventTitleInput =
    document.getElementById("eventTitle");
let eventDescriptionInput =
    document.getElementById("eventDescription");
let reminderList =
    document.getElementById("reminderList");

// Counter to generate unique event IDs
let eventIdCounter = 1;

// Function to add events
function addEvent() {
    let date = eventDateInput.value;
    let title = eventTitleInput.value;
    let description = eventDescriptionInput.value;

    if (date && title) {
        // Create a unique event ID
        let eventId = eventIdCounter++;

        events.push(
            {
                id: eventId, date: date,
                title: title,
                description: description
            }
        );
        showCalendar(currentMonth, currentYear);
        eventDateInput.value = "";
        eventTitleInput.value = "";
        eventDescriptionInput.value = "";
        displayReminders();
    }
}

// Function to delete an event by ID
function deleteEvent(eventId) {
    // Find the index of the event with the given ID
    let eventIndex =
        events.findIndex((event) =>
            event.id === eventId);

    if (eventIndex !== -1) {
        // Remove the event from the events array
        events.splice(eventIndex, 1);
        showCalendar(currentMonth, currentYear);
        displayReminders();
    }
}

// Function to display reminders
function displayReminders() {
    reminderList.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let eventDate = new Date(event.date);
        if (eventDate.getMonth() ===
            currentMonth &&
            eventDate.getFullYear() ===
            currentYear) {
            let listItem = document.createElement("li");
            listItem.innerHTML =
                `<strong>${event.title}</strong> - 
            ${event.description} on 
            ${eventDate.toLocaleDateString()}`;

            // Add a delete button for each reminder item
            let deleteButton =
                document.createElement("button");
            deleteButton.className = "delete-event";
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                deleteEvent(event.id);
            };

            listItem.appendChild(deleteButton);
            reminderList.appendChild(listItem);
        }
    }
}

// Function to generate a range of 
// years for the year select input
function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" +
            year + "'>" + year + "</option>";
    }
    return years;
}

// Initialize date-related letiables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear = generate_year_range(1970, 2050);

document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let days = [
    "Sun", "Mon", "Tue", "Wed",
    "Thu", "Fri", "Sat"];

$dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" +
        days[dhead] + "'>" +
        days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;

monthAndYear =
    document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

// Function to navigate to the next month
function next() {
    currentYear = currentMonth === 11 ?
        currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

// Function to navigate to the previous month
function previous() {
    currentYear = currentMonth === 0 ?
        currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ?
        11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

// Function to jump to a specific month and year
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

// Function to display the calendar
function showCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span";

                if (
                    date === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                ) {
                    cell.className = "date-picker selected";
                }

                // Check if there are events on this date
                if (hasEventOnDate(date, month, year)) {
                    cell.classList.add("event-marker");
                    cell.appendChild(
                        createEventTooltip(date, month, year)
                );
                }

                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }

    displayReminders();
}

// Function to create an event tooltip
function createEventTooltip(date, month, year) {
    let tooltip = document.createElement("div");
    tooltip.className = "event-tooltip";
    let eventsOnDate = getEventsOnDate(date, month, year);
    for (let i = 0; i < eventsOnDate.length; i++) {
        let event = eventsOnDate[i];
        let eventDate = new Date(event.date);
        let eventText = `<strong>${event.title}</strong> - 
            ${event.description} on 
            ${eventDate.toLocaleDateString()}`;
        let eventElement = document.createElement("p");
        eventElement.innerHTML = eventText;
        tooltip.appendChild(eventElement);
    }
    return tooltip;
}

// Function to get events on a specific date
function getEventsOnDate(date, month, year) {
    return events.filter(function (event) {
        let eventDate = new Date(event.date);
        return (
            eventDate.getDate() === date &&
            eventDate.getMonth() === month &&
            eventDate.getFullYear() === year
        );
    });
}

// Function to check if there are events on a specific date
function hasEventOnDate(date, month, year) {
    return getEventsOnDate(date, month, year).length > 0;
}

// Function to get the number of days in a month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

// Call the showCalendar function initially to display the calendar
showCalendar(currentMonth, currentYear);


function fetchData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to verify
            callback(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function populateTable(data, tableSelector, rowTemplate) {
    const tableBody = document.querySelector(tableSelector + ' tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('tr1'); // Add the 'tr1' class to each row
        row.innerHTML = rowTemplate(item);
        tableBody.appendChild(row);
    });
}

/*function populateCandidatesTable(data) {
    const rowTemplate = (candidate) => `  
        <td id="fullname" class="fullname">${candidate.full_name}</td>
        <td id="job-title"><strong>${candidate.job_title}</strong></td>
        <td id="company-name">${candidate.company_name}</td>
        <td id="date">${candidate.date_applied}</td>
        <td>
            <select class="status-dropdown">
                <option ${candidate.status === 'Interview' ? 'selected' : ''}>Interview</option>
                <option ${candidate.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option ${candidate.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                <option ${candidate.status === 'Deployed' ? 'selected' : ''}>Deployed</option>
            </select>
        </td>
            <td class="candidates-tooltip-container">
            <i class="fa fa-info-circle fa-2xl" aria-hidden="true" style="color: #2C1875; cursor: pointer;" onclick="showInfo()"></i>
            <span class="tooltip-text">Candidate Information</span>
        </td>
        <td class="candidates-tooltip-container">
            <i class="fa-solid fa-trash fa-2xl" style="color: #EF9B50; cursor: pointer;" onclick="showDialog()"></i>
            <span class="tooltip-text">Delete Candidate</span>
        </td>
    `;
    populateTable(data, 'table', rowTemplate);
}*/
// Helper function to format date to MM/DD/YYYY
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options).replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3'); // Ensure MM/DD/YYYY format
}

/*function populateRejectsTable(data) {
    const rowTemplate = (reject) => `
        <tr>
            <td class="fullname">${reject.full_name}</td>
            <td><strong>${reject.company_name}</strong></td>
            <td>${reject.job_title}</td>
            <td>${reject.remarks}</td>
            <td>${formatDate(reject.date_rejected)}</td>
            <td class="candidates-tooltip-container">
                <i class="fa-solid fa-rotate-left fa-2xl" style="color: #2C1875; cursor: pointer;" 
                   onclick="undoRejection(${reject.userid}, ${reject.job_id})"></i>
                <span class="tooltip-text">Undo Rejection</span> 
            </td>
            <td class="candidates-tooltip-container">
                <i class="fa-solid fa-trash fa-2xl" style="color: #EF9B50; cursor: pointer;" onclick="showEditDialog()"></i>
                <span class="tooltip-text">Remove Applicant</span>
            </td>
        </tr>
    `;
    populateTable(data, 'table', rowTemplate);
}*/

function populateEmployeesTable(data) {
    const activeBody = document.querySelector('#active-employees-body');
    const inactiveBody = document.querySelector('#inactive-employees-body');
    const noActiveMessage = document.getElementById('no-active-employees-message');
    const noInactiveMessage = document.getElementById('no-inactive-employees-message');

    // Clear previous data
    activeBody.innerHTML = '';
    inactiveBody.innerHTML = '';

    let activeEmployeesCount = 0;
    let inactiveEmployeesCount = 0;

    data.forEach(employee => {
        const rowTemplate = `
            <tr class="tr1" data-status="${employee.status}">
                <td class="fullname">${employee.full_name}</td>
                <td>${employee.date_added}</td>
                <td>
                    <select id="employee-status-dropdown-${employee.employee_id}" class="status-dropdown" data-original-value="${employee.status}" onchange="handleEmployeeStatusChange(${employee.employee_id})">
                        <option value="Active" ${employee.status === 'Active' ? 'selected' : ''}>Active</option>
                        <option value="Inactive" ${employee.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                </td>
                <td>
                    <div class="employees-tooltip-container">
                        <i class="fa-solid fa-pen-to-square fa-2xl" style="color: #2C1875; cursor: pointer;" onclick="showEditDialog(${employee.employee_id})"></i>
                        <span class="tooltip-text">Edit <br>Employee</span>
                    </div>
                </td>
                <td>
                    <div class="employees-tooltip-container">
                        <i class="fa-solid fa-trash fa-2xl" style="color: #EF9B50; cursor: pointer;" onclick="showDialogDelete(${employee.employee_id})"></i>
                        <span class="tooltip-text">Delete Employee</span>
                    </div>
                </td>
            </tr>
        `;

        if (employee.status === 'Active') {
            activeBody.insertAdjacentHTML('beforeend', rowTemplate);
            activeEmployeesCount++;
        } else {
            inactiveBody.insertAdjacentHTML('beforeend', rowTemplate);
            inactiveEmployeesCount++;
        }
    });

    // Show or hide the "No active employees found" message
    noActiveMessage.style.display = activeEmployeesCount === 0 ? 'block' : 'none';

    // Show or hide the "No inactive employees found" message
    noInactiveMessage.style.display = inactiveEmployeesCount === 0 ? 'block' : 'none';
}






function handleEmployeeStatusChange(employeeId) {
    const dropdown = document.getElementById(`employee-status-dropdown-${employeeId}`);
    const selectedValue = dropdown.value;
    const originalValue = dropdown.getAttribute('data-original-value');

    const confirmation = confirm(`Are you sure you want to change the status of employee ID ${employeeId} to: ${selectedValue}?`);

    if (confirmation) {
        // User confirmed the change
        console.log(`Status for employee ID ${employeeId} changed to: ${selectedValue}`);
        // Update the original value with the new selection
        dropdown.setAttribute('data-original-value', selectedValue);

        // Send an AJAX request to update the status in the database
        updateEmployeeStatusInDatabase(employeeId, selectedValue)
            .then(() => {
                // Reload the page after a successful update
                location.reload();
            });
    } else {
        // User canceled the change, revert to the original value
        dropdown.value = originalValue;
        console.log('Status change canceled. Reverted to original value.');
    }
}

function updateEmployeeStatusInDatabase(employeeId, status) {
    // Example using fetch API to send the update request
    return fetch('updateEmployeeStatus.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            employeeId: employeeId,
            status: status
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Employee status updated successfully in the database.');
            return true; // Return success
        } else {
            console.error('Failed to update employee status in the database.');
            return false; // Return failure
        }
    })
    .catch(error => {
        console.error('Error updating employee status:', error);
        return false; // Return failure
    });
}


function populatePartnersTable(data) {
    const rowTemplate = (partner) =>
         `
        <td id="logo">
            <img src="data:image/jpeg;base64,${partner.logo}" alt="Image not found" width="100">
        </td>
        <td id="company-name">${partner.company_name}</td>
        <td>
            <div class="partners-tooltip-container">
                <i class="fa-solid fa-file fa-2xl" style="color: #2C1875; cursor: pointer;" onclick="openThirdPopup('${partner.company_name}')"></i>
                <span class="tooltip-text">Post a Job for Partner</span>
            </div>
        </td>
        <td id="date-added">${partner.date_added}</td>
        <td>
            <div class="partners-tooltip-container">
                <i class="fa-solid fa-pen-to-square fa-2xl" style="color: #2C1875; cursor: pointer;" onclick="showEditPartnerDialog(${partner.id})"></i>
                <span class="tooltip-text">Edit Partner Company</span>
            </div>
        </td>
        <td>
            <div class="partners-tooltip-container">
                <i class="fa-solid fa-trash fa-2xl" style="color: #EF9B50; cursor: pointer;" onclick="showDialogDeletePartner(${partner.id})"></i>
                <span class="tooltip-text">Delete Partner Company</span>
            </div>
        </td>
    `;
    
    populateTable(data, 'table', rowTemplate);
}

function populateJobsTable(containerSelector, data) {
    const rowTemplate = (job) => `
        <td><img src="data:image/jpeg;base64,${job.company_logo}" alt="${job.company_name} Logo"></td>
        <td id="company-name"><strong>${job.company_name}</strong></td>
        <td id="job-title"><strong>${job.job_title}</strong><br>${job.job_location}</td>
        <td id="date">${job.date_posted}</td>
        <td id="available">${job.job_candidates}</td>
        <td>
            <select id="job-status-dropdown-${job.id}" class="status-dropdown" data-original-value="${job.job_status}" onchange="handleStatusChange(${job.id})">
                <option value="Open" ${job.job_status === 'Open' ? 'selected' : ''}>Open</option>
                <option value="Closed" ${job.job_status === 'Closed' ? 'selected' : ''}>Closed</option>
            </select>
        </td>
        <td id="edit">
            <div class="tooltip-container">
                <i class="fa-solid fa-pen-to-square fa-2xl" style="color: #2C1875; cursor: pointer;" onclick="openEditJobPopup(${job.id})"></i>
                <span class="tooltip-text">Edit Job Listing</span>
            </div>
        </td>
        ${job.job_status === 'Closed' ? `
        <td>
            <i class="fa-solid fa-trash fa-2xl" style="color: #EF9B50; cursor: pointer;" onclick="showDialogDeleteJob(${job.id})"></i>
        </td>
        ` : ''} <!-- Only include this for Closed jobs -->
    `;

    const tableBody = document.querySelector(containerSelector + ' table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    if (data.length === 0) {
        // If no jobs found, display message
        const messageRow = document.createElement('tr');
        messageRow.innerHTML = `<td colspan="7" style="text-align: center; color: #2C1875; font-size: 20px; font-weight: bold; padding: 5rem 0rem;">No available jobs found.</td>`; // Adjust colspan as needed
        tableBody.appendChild(messageRow);
    } else {
        // Populate table with jobs
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('tr1'); // Add the 'tr1' class to each row
            row.innerHTML = rowTemplate(item);
            tableBody.appendChild(row);
        });
    }
}

function confirmDeleteJob() {
    if (deleteJobId !== null) {
        const formData = new FormData();
        formData.append('id', deleteJobId);

        fetch('deleteJob.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Job deleted successfully!');
                hideDialogDeleteJob(); // Hide the confirmation dialog
                location.reload()
                fetchData('fetch_partners.php', populatePartnersTable); // Refresh the table
            } else {
                alert('An error occurred while deleting the Job.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the job.');
        });
    }
}

function handleStatusChange(jobId) {
    const dropdown = document.getElementById(`job-status-dropdown-${jobId}`);
    const selectedValue = dropdown.value;
    const originalValue = dropdown.getAttribute('data-original-value');

    const confirmation = confirm(`Are you sure you want to change the job status to: ${selectedValue}?`);

    if (confirmation) {
        // User confirmed the change
        console.log(`Job status changed to: ${selectedValue}`);
        // Update the original value with the new selection
        dropdown.setAttribute('data-original-value', selectedValue);

        // Send an AJAX request to update the status in the database
        updateJobStatusInDatabase(jobId, selectedValue);
    } else {
        // User canceled the change, revert to the original value
        dropdown.value = originalValue;
        console.log('Job status change canceled.');
    }
}

function updateJobStatusInDatabase(jobId, status) {
    fetch('updateJobStatus.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jobId: jobId,
            status: status
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Job status updated successfully in the database.');
            // Refresh the page after successful update
            location.reload();
        } else {
            console.error('Failed to update job status in the database.');
            // Revert the dropdown to its original value if the update fails
            const dropdown = document.getElementById(`job-status-dropdown-${jobId}`);
            dropdown.value = dropdown.getAttribute('data-original-value');
        }
    })
    .catch(error => {
        console.error('Error updating job status:', error);
        // Revert the dropdown to its original value if the update fails
        const dropdown = document.getElementById(`job-status-dropdown-${jobId}`);
        dropdown.value = dropdown.getAttribute('data-original-value');
    });
}

function openEditJobPopup(jobId) {
    initializePopupPagination('editJob-popup');
    currentJobId = jobId; // Store the job ID for use in the popup
    console.log(currentJobId);

    // Show the edit job popup and overlay
    document.getElementById('editJob-popup').classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.getElementById('editJob-popup').style.display = 'block'
    

    fetch(`getJobData.php?id=${jobId}`)
        .then(response => response.json())
        .then(job => {
            console.log(job); // Log the entire response

            // Populate form fields with the job's data
            document.getElementById('edit-jobposting-partner-company').value = job.company_name;
            document.getElementById('edit-jobposting-job-title').value = job.job_title;
            document.getElementById('edit-jobposting-location').value = job.job_location;
            document.getElementById('edit-jobposting-openings').value = job.job_candidates;
            document.getElementById('edit-jobposting-description').value = job.job_description;

            initializeSkillsInput('editJob-popup', 'edit-jobposting-skills-input', 'edit-jobposting-skills-container');

            // Clear any existing skills
            const skillsContainer = document.querySelector('#edit-jobposting-skills-container');
            const skillsInput = document.querySelector('#edit-jobposting-skills-input');

            // Add fetched skills to the container
            job.skills.forEach(skill => addSkill(skillsContainer, skill, skillsInput));
        })
        .catch(error => console.error('Error fetching job data:', error));
}


// Function to save and post the edited job
function editJob() {

    const jobTitle = document.getElementById('edit-jobposting-job-title').value;
    const location = document.getElementById('edit-jobposting-location').value;
    const openings = document.getElementById('edit-jobposting-openings').value;
    const description = document.getElementById('edit-jobposting-description').value.trim();

    // Collect skills
    const skillsArray = Array.from(skillsSet); // Convert the Set to an array
    console.log('Job Title:', jobTitle);
    console.log('Location:', location);
    console.log('Openings:', openings);
    console.log('Description:', description);
    console.log('Skills Array:', skillsArray);
    console.log('Job Id:'. currentJobId);

    // Input validation
    if (!jobTitle || !location || !openings) {
        alert('Please fill out all required fields.');
        return; // Prevent form submission
    }

    // Validate openings field
    const openingsInt = parseInt(openings, 10);
    if (isNaN(openingsInt) || openingsInt < 1 || openingsInt > 100) {
        alert('The number of openings must be an integer between 1 and 100.');
        return; // Prevent form submission
    }

    // Create form data
    const formData = new FormData();
    formData.append('job_title', jobTitle);
    formData.append('job_location', location);
    formData.append('job_candidates', openings);
    formData.append('job_description', description);
    formData.append('skills', JSON.stringify(skillsArray)); // Send the skills as a JSON string
    formData.append('id', currentJobId); // Include the job ID for update

    // Send data using fetch
    fetch('editJob.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log('Success:', data.message);
            alert('Job post updated successfully!');
            closePopup('editJob-popup');

            fetchJobCounts();
            fetchJobsByStatus('Open');
        } else {
            console.error('Error:', data.error);
            alert('An error occurred while updating the job: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the job.');
    });
}

//Function to show number of open and closed jobs
function fetchJobCounts() {
    fetch('fetch_job_counts.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('open').textContent = data.open_count;
            document.getElementById('close').textContent = data.closed_count;
        })
        .catch(error => console.error('Error fetching job counts:', error));
}

//Fetches jobs depending on status(Open or Closed)
function fetchJobsByStatus(status) {
    fetch(`fetch_jobs.php?status=${status}`)
        .then(response => response.json())
        .then(data => {
            const containerSelector = status === 'Open' ? '#tab1-content' : '#tab2-content';
            populateJobsTable(containerSelector, data); // Populate the correct table based on the status
        })
        .catch(error => console.error('Error fetching jobs:', error));
}

/*function showDialog() {
    document.getElementById('dialogBox').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeDialog() {
    document.getElementById('dialogBox').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.getElementById('overlay').addEventListener('click', closeDialog);*/

//Inputs for Admin Side

// Function to fetch options and populate spinner for a specific popup
function fetchOptions(popupId) {
    fetch('fetch_jobPostPartners.php')
        .then(response => response.json())
        .then(data => {
            populateSpinner(popupId, data);
        })
        .catch(error => console.error('Error fetching options:', error));
}

// Function to populate spinner with data for a specific popup
function populateSpinner(popupId, options) {
    const spinner = document.getElementById(popupId).querySelector('.jobposting-select');
    
    if (!spinner) return;

    spinner.innerHTML = '';

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.id; // ID field
        opt.textContent = option.company_name; // value to display
        spinner.appendChild(opt);
    });
}


//Functions to add partners
function submitForm() {
    const companyName = document.getElementById('addpartners-company-name').value.trim();
    const industry = document.getElementById('addpartners-industry').value.trim();
    const location = document.getElementById('addpartners-location').value.trim();
    const description = document.getElementById('addpartners-company-description').value.trim();
    
    let logoFile = document.getElementById('logo-upload').files[0];

    console.log('Company Name:', companyName);
    console.log('Industry:', industry);
    console.log('Location:', location);
    console.log('Description:', description);

    // Validate form fields
    if (!companyName || !industry || !location || !description) {
        alert('Please fill out all required fields.');
        return; // Prevent form submission
    }

    // Create FormData object to handle file and text data
    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('industry', industry);
    formData.append('location', location);
    formData.append('description', description);

    // Only append logo if the user uploaded a file
    if (logoFile instanceof File) {
        formData.append('logo', logoFile);
    }

    // Send data using Fetch
    fetch('addPartner.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log('Success:', data.message);
            alert('Partner added successfully!');
            // Hide the form after successful submission
            hideDialog();

            // Clear the form fields
            document.getElementById('addpartners-company-name').value = '';
            document.getElementById('addpartners-industry').value = '';
            document.getElementById('addpartners-location').value = '';
            document.getElementById('addpartners-company-description').value = '';
            document.getElementById('logo-upload').value = ''; // Clear file input
            document.getElementById('logo-preview').src = ''; // Clear image preview
            document.getElementById('logo-preview').style.display = 'none';

            // Fetch and display new data
            fetchData('fetch_partners.php', populatePartnersTable);
        } else {
            console.error('Error:', data.error);
            alert('An error occurred while adding the partner.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while adding the partner.');
    });
}


//Adding new job post
// Function to collect form data and send to the server
function saveAndPostJob() {
    // Collect data from the popup
    const companySelect = document.getElementById('jobposting-partner-company');
    const companyName = companySelect.options[companySelect.selectedIndex].text; // Get the text
    const jobTitleSelect = document.getElementById('jobposting-job-title');
    const jobTitle = jobTitleSelect.options[jobTitleSelect.selectedIndex].text;
    
    const location = document.getElementById('jobposting-location').value;
    const candidates = document.getElementById('jobposting-openings').value;
    const description = document.getElementById('jobposting-description').value.trim();

    console.log('Company Name:', companyName);
    console.log('Job Title:', jobTitle);
    console.log('Location:', location);
    console.log('Candidates:', candidates);
    console.log('Description:', description);

    // Input validation
    if (!companyName || !jobTitle || !location || !candidates /*|| skillsArray.length === 0*/) {
        alert('Please fill out all required fields.');
        return; // Prevent form submission
    }

    // Validate candidates field
    const candidatesInt = parseInt(candidates, 10);
    if (isNaN(candidatesInt) || candidatesInt < 1 || candidatesInt > 100) {
        alert('The number of candidates must be an integer between 1 and 100.');
        return; // Prevent form submission
    }

    // Create form data
    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('job_title', jobTitle);
    formData.append('location', location);
    formData.append('candidates', candidates);
    formData.append('description', description);
    //formData.append('skills', JSON.stringify(skillsArray)); // Send the skills as a JSON string

    

    // Send data using fetch
    fetch('addJobPost.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.message){
            console.log('Success:', data.message);
            // Handle success, e.g., close the popup or display a message
            alert('Job post added successfully!');
            closePopup('popup');

            fetchJobCounts();
            fetchJobsByStatus('Open');

            window.location.reload();
        }
        else {
            console.error('Error:', data.error);
            alert('An error occurred while adding the job: ' + data.error);
        }     
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, e.g., display an error message
        alert('An error occurred while adding the job.');
    });
}

// Function to collect form data and send to the server from partner section
function partnerSaveAndPostJob() {
    // Collect data from the popup
    console.log('clicked');

    const companyName = document.getElementById('partner-jobposting-partner-company').value;
    console.log('Company Name:', companyName);
    
    const jobTitleSelect = document.getElementById('partner-jobposting-job-title');
    const jobTitle = jobTitleSelect.options[jobTitleSelect.selectedIndex]?.text || '';
    console.log('Job Title:', jobTitle);
    

    const location = document.getElementById('partner-jobposting-location').value;
    console.log('Location:', location);
    
    const candidates = document.getElementById('partner-jobposting-openings').value;
    console.log('Candidates:', candidates);
    
    const description = document.getElementById('partner-jobposting-description').value.trim();
    console.log('Description:', description);
    
    // Input validation
    if (!companyName || !jobTitle || !location || !candidates) {
        alert('Please fill out all required fields.');
        return; // Prevent form submission
    }

    // Validate candidates field
    const candidatesInt = parseInt(candidates, 10);
    if (isNaN(candidatesInt) || candidatesInt < 1 || candidatesInt > 100) {
        alert('The number of candidates must be an integer between 1 and 100.');
        return; // Prevent form submission
    }

    
    // Create form data
    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('job_title', jobTitle);
    formData.append('location', location);
    formData.append('candidates', candidates);
    formData.append('description', description);

    // Check if FormData is populated correctly
    console.log('FormData:', Array.from(formData.entries()));

    // Send data using fetch
    fetch('addJobPost.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Check for HTTP errors
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            console.log('Success:', data.message);
            alert('Job post added successfully!');
            closePopup('popup');

            fetchJobCounts();
            fetchJobsByStatus('Open');

            window.location.reload();
        } else {
            console.error('Error:', data.error);
            alert('An error occurred while adding the job: ' + data.error);
        }     
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while adding the job: ' + error.message);
    });
    
}


function showEditDialog(employeeId){
    currentEmployeeId = employeeId;
    document.getElementById('edit-dialogBox').style.display = 'block';
    document.getElementById('edit-dialogBox').classList.add('show');
    document.getElementById('overlay').classList.add('show');

    console.log(employeeId);

    fetch(`getEmployeeData.php?id=${employeeId}`)
        .then(response => response.json())
        .then(employee => {

            // Populate form fields with the partner's data
            document.getElementById('edit-employees-firstname').value = employee.first_name;
            document.getElementById('edit-employees-lastname').value = employee.last_name;
            document.getElementById('edit-employees-userid').value = employee.employee_id;
        })
        .catch(error => console.error('Error fetching partner data:', error));
}

function hideEditDialog(){
    document.getElementById('edit-dialogBox').style.display = 'none';
    document.getElementById('edit-dialogBox').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
}

function editEmployee() {
    const firstName = document.getElementById('edit-employees-firstname').value.trim();
    const lastName = document.getElementById('edit-employees-lastname').value.trim();

    // Input validation
    if (!firstName || !lastName) {
        alert('Please fill out all required fields.');
        return; // Prevent form submission
    }

    // Create form data
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('employee_id', currentEmployeeId); // Assuming currentEmployeeId is defined

    // Send data using fetch
    fetch('editEmployee.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Employee data updated successfully!');
            hideEditDialog();
            // Optionally refresh the employee list
            fetchData('fetch_employees.php', populateEmployeesTable);
        } else {
            console.error('Error:', data.error);
            alert('An error occurred while updating the employee data: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the employee data.');
    });
}





function addNewEmployee() {
    const firstName = document.getElementById('addemployees-firstname').value.trim();
    const lastName = document.getElementById('addemployees-lastname').value.trim();
    const username = document.getElementById('addemployees-username').value.trim(); // Get username directly
    const password = document.getElementById('addemployees-password').value.trim();

    // Input validation
    if (!firstName || !lastName || !username) {
        alert('Please fill out all required fields.');
        return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('username', username); // Pass username from input
    formData.append('password', password);

    // Send data using Fetch
    fetch('addEmployee.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Employee added successfully!');
            hideEmployeeDialog();

            // Clear the form fields
            document.getElementById('addemployees-firstname').value = '';
            document.getElementById('addemployees-lastname').value = '';
            document.getElementById('addemployees-username').value = '';
            document.getElementById('addemployees-password').value = '';

            // Refresh the page to show updated employee data
            location.reload();
        } else {
            console.error('Error:', data.error);
            alert('An error occurred while adding the Employee.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while adding the Employee.');
    });
}




function showEditPartnerDialog(partnerId) {
    currentPartnerId = partnerId;
    document.getElementById('editPartner-dialogBox').style.display = 'block';
    document.getElementById('editPartner-dialogBox').classList.add('show');
    document.getElementById('overlay').classList.add('show');
    
    console.log(partnerId);
    
    fetch(`getPartnerData.php?id=${partnerId}`)
        .then(response => response.json())
        .then(partner => {
            // Populate form fields with the partner's data
            document.getElementById('editpartners-company-name').value = partner.company_name;
            document.getElementById('editpartners-industry').value = partner.industry;
            document.getElementById('editpartners-location').value = partner.company_location;
            document.getElementById('editpartners-company-description').value = partner.company_description;
            document.getElementById('edit-upload-placeholder').style.display = 'none';

            var logoImg = document.getElementById('edit-logo-preview');
            logoImg.style.display = 'block' 
            logoImg.src = `data:image/png;base64,${partner.logo}`;
            // Handle the logo separately if needed
        })
        .catch(error => console.error('Error fetching partner data:', error));
}

function hideEditPartnerDialog() {
    document.getElementById('editPartner-dialogBox').style.display = 'none';
    document.getElementById('editPartner-dialogBox').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');

    // Reset the logo preview
    const logoPreview = document.getElementById('logo-preview');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const logoUpload = document.getElementById('logo-upload');
    
    logoPreview.style.display = 'none';
    logoPreview.src = '';
    uploadPlaceholder.style.display = 'flex';
    logoUpload.value = ''; // Clear the file input
}



function editPartner() {
    const companyName = document.getElementById('editpartners-company-name').value;
    const companyLocation = document.getElementById('editpartners-location').value;
    const industry = document.getElementById('editpartners-industry').value;
    const companyDescription = document.getElementById('editpartners-company-description').value;
    const logoFile = document.getElementById('edit-logo-upload').files[0];


    console.log('Company Name:', companyName);
    console.log('Industry:', industry);
    console.log('Location:', companyLocation);
    console.log('Description:', companyDescription);
    console.log('Partner Id:', currentPartnerId)

    // Create FormData object to handle file and text data
    const formData = new FormData();
    formData.append('company_name', companyName);
    formData.append('industry', industry);
    formData.append('company_location', companyLocation);
    formData.append('company_description', companyDescription);
    formData.append('id', currentPartnerId);

    if (logoFile) {
        formData.append('logo', logoFile);
    }

    // Send data using Fetch
    fetch('editPartner.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            console.log('Success:', data.message);
            alert('Partner updated successfully!');
            // Hide the form after successful submission
            hideEditPartnerDialog();

            // Clear the form fields
            document.getElementById('addpartners-company-name').value = '';
            document.getElementById('addpartners-industry').value = '';
            document.getElementById('addpartners-location').value = '';
            document.getElementById('addpartners-company-description').value = '';
            document.getElementById('logo-upload').value = ''; // Clear file input
            document.getElementById('logo-preview').src = ''; // Clear image preview
            document.getElementById('logo-preview').style.display = 'none';

            // Fetch and display new data
            fetchData('fetch_partners.php', populatePartnersTable);
            
        } else {
            console.error('Error:', data.error);
            alert('An error occurred while updating the partner.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the partner.');
    });
}

function confirmDelete() {
    if (deletePartnerId !== null) {
        const formData = new FormData();
        formData.append('id', deletePartnerId);

        fetch('deletePartner.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Partner deleted successfully!');
                hideDialogDelete(); // Hide the confirmation dialog
                fetchData('fetch_partners.php', populatePartnersTable); // Refresh the table
            } else {
                alert('An error occurred while deleting the partner.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the partner.');
        });
    }
}


function initializePopupPagination(popupId) {
    const popup = document.getElementById(popupId);
    if (!popup) return;

    const prevBtns = popup.querySelectorAll(".btn-prev");
    const nextBtns = popup.querySelectorAll(".btn-next");
    const steps = popup.querySelectorAll(".form-step");
    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle("form-step-active", i === index);
        });
    }

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep = Math.max(0, currentStep - 1);
            showStep(currentStep);
        });
    });

    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep = Math.min(steps.length - 1, currentStep + 1);
            showStep(currentStep);
        });
    });

    // Show the first step initially
    showStep(currentStep);
}

// Initialize pagination for all popups

initializePopupPagination('thirdPopup')


// Function to initialize skill input handling for a specific popup
function initializeSkillsInput(popupId, inputId1, inputId2, containerSelector1, containerSelector2) {
    var popup = document.getElementById(popupId);
    var skillsInput = popup.querySelector(`#${inputId1}`);
    var skillsContainer = popup.querySelector(`#${containerSelector1}`);

    var skillsDisplay = popup.querySelector(`#${inputId2}`);
    var skillsDisplayContainer = popup.querySelector(`#${containerSelector2}`);

    console.log(popup);
    console.log(skillsInput);
    console.log(skillsContainer);

    // Check if the container and input exist
    if (!skillsContainer || !skillsInput) {
        console.error('Invalid container or input element');
        return;
    }

    // Event listener for adding a new skill
    skillsInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const value = skillsInput.value.trim();
            if (value && !skillsSet.has(value.toLowerCase())) {
                addSkill(skillsDisplayContainer, value, skillsDisplay); // Pass skillsInput as an argument
                skillsInput.value = '';
            }
        }
    });

    // Add existing skills to the Set
    popup.querySelectorAll('.jobposting-skill').forEach(skillElement => {
        var text = skillElement.textContent.trim().toLowerCase();
        skillsSet.add(text);

        // Add close button functionality to existing skills
        var closeBtn = skillElement.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            skillsContainer.removeChild(skillElement);
            skillsSet.delete(text);
        });
    });
}
//Start of edit


// Function to add a new skill
function addSkill(container, text, skillsInput) {
    // If the container or text is invalid, exit
    if (!container || !text) return;

    // Check if the skill already exists
    if (skillsSet.has(text.toLowerCase())) return;

    // Add the skill to the Set
    skillsSet.add(text.toLowerCase());

    const skill = document.createElement('div');
    skill.classList.add('jobposting-skill');
    skill.textContent = text;

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function () {
        container.removeChild(skill);
        skillsSet.delete(text.toLowerCase());
    });

    skill.appendChild(closeBtn);

    // Insert the skill before the input element
    container.insertBefore(skill, skillsInput);
}



document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('job-status-dropdown');
    let previousValue = dropdown.value;  // Store the initial value

    dropdown.addEventListener('change', function() {
        if (dropdown.value !== previousValue) {
            // Show a confirmation dialog
            const userConfirmed = confirm('Do you want to save the changes?');

            if (userConfirmed) {
                // Update the database with the new status
                updateDatabase(dropdown.value)
                    .then(() => {
                        previousValue = dropdown.value;  // Update previous value on successful save
                    })
                    .catch(error => {
                        console.error('Error updating database:', error);
                        // Optionally, show an error message to the user
                    });
            } else {
                // Revert to previous value
                dropdown.value = previousValue;
            }
        }
    });

    // Function to update the database
    function updateDatabase(newStatus) {
        return fetch('update_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }
});

function showJobTitle() {
    const btn1 = document.getElementById('saveAndPostBtn1');
    const btn2 = document.getElementById('saveAndPostBtn2');;
    const btn3 = document.getElementById('saveAndPostBtn3');;

    if (globalButtonSelector == false) {
        // Remove the event listener for saveJobTitle
        btn1.removeAttribute('onclick')
        btn2.removeAttribute('onclick')
        btn3.removeAttribute('onclick')
        // Add the event listener for editJobTitle
        btn1.setAttribute('onclick', 'editJobTitle()')
        btn2.setAttribute('onclick', 'editJobTitle()')
        btn3.setAttribute('onclick', 'editJobTitle()')
    } else {
        // Remove the event listener for editJobTitle
        btn1.removeAttribute('onclick')
        btn2.removeAttribute('onclick')
        btn3.removeAttribute('onclick')
        // Add the event listener for saveJobTitle
        btn1.setAttribute('onclick', 'saveJobTitle()');
        btn2.setAttribute('onclick', 'saveJobTitle()');
        btn3.setAttribute('onclick', 'saveJobTitle()');
    }

    console.log(globalButtonSelector);

    document.getElementById('add-job-title-popup').style.display = 'block';
    document.getElementById('add-job-title-popup').classList.add('show');
    initializePopupPagination('add-job-title-popup');
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup').classList.remove('show');
    initializeSkillsInput('add-job-title-popup', 'jobposting-search', 'jobposting-skills-input', 'add-jobposting-search-container','add-jobposting-skills-container');
}

function hideJobTitle() {

    document.getElementById('add-job-title-popup').style.display = 'none';
    document.getElementById('add-job-title-popup').classList.remove('show');
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup').classList.add('show');

    const jobTitle = document.getElementById('job_title');
    jobTitle.removeAttribute('readonly');
    globalButtonSelector = true;


    // Remove all skill tags from the container but keep the input field
    const skillsContainer = document.querySelector('#add-job-title-popup .jobposting-skills-container');
    const skills = skillsContainer.querySelectorAll('.jobposting-skill');
    skills.forEach(skill => skillsContainer.removeChild(skill));


    //Clear job title input field
    jobTitle.value = '';


    // Clear the skills set
    skillsSet.clear();

    // Clear the job title input field
    document.getElementById('job-title-cert').value = '';

    // Clear the Name of Job input field
    document.getElementById('edit-jobposting-partner-company').value = '';

    // Reset the Classification dropdown values
    document.getElementById('classification').selectedIndex = 0; // Select the first option
    document.getElementById('subclassification').selectedIndex = 0; // Select the first option

    // Clear the Gender radio buttons
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => radio.checked = false);

    // Clear the Educational Attainment radio buttons
    const educRadios = document.querySelectorAll('input[name="educ-level"]');
    educRadios.forEach(radio => radio.checked = false);
}

function saveJobTitle() {

    const jobTitle = document.getElementById('job_title').value.trim();
    const classification = document.getElementById('classification').value;
    const subclassification = document.getElementById('subclassification').value;
    const gender = document.getElementById('gender').value;
    const educationalAttainment = document.getElementById('educational_attainment').value;
    const certLicense = document.getElementById('job-title-cert').value.trim();
    const minYearsOfExperience = document.getElementById('min-job-title-exp').value.trim();
    const maxYearsOfExperience = document.getElementById('max-job-title-exp').value.trim();
    const yearsOfExperience = `${minYearsOfExperience}-${maxYearsOfExperience}`;

    // Validation: Ensure all required fields are filled in
    if (!jobTitle) {
        alert('Job Title is required.');
        return;
    }
    if (!classification) {
        alert('Classification is required.');
        return;
    }
    if (!subclassification) {
        alert('Subclassification is required.');
        return;
    }
    if (!gender) {
        alert('Gender is required.');
        return;
    }
    if (!educationalAttainment) {
        alert('Educational Attainment is required.');
        return;
    }

    const skillsArray = Array.from(skillsSet); // Convert the Set to an array

    // Log the input values to ensure they are captured correctly
    console.log("Job Title:", jobTitle);
    console.log("Classification:", classification);
    console.log("Subclassification:", subclassification);
    console.log("Gender:", gender);
    console.log("Educational Attainment:", educationalAttainment);
    console.log("Cert/License:", certLicense);
    console.log("Years of Experience:", yearsOfExperience);
    console.log('Skills Array:', skillsArray);

    // Create an object to hold the data
    const data = {
        job_title: jobTitle,
        classification: classification,
        subclassification: subclassification,
        gender: gender,
        educational_attainment: educationalAttainment,
        cert_license: certLicense,
        years_of_experience: yearsOfExperience,
        skills: skillsArray
    };

    const jsonData = JSON.stringify(data); // Convert data to JSON string
    console.log(jsonData); // Debug: Print JSON string to console

    // Send data via AJAX to PHP
    fetch('save_job_title.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData, // Send JSON data
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Job title saved successfully!');
            
            // Clear all fields after successful save
            document.getElementById('job_title').value = '';
            document.getElementById('classification').value = '';
            document.getElementById('subclassification').value = '';
            document.getElementById('gender').value = '';
            document.getElementById('educational_attainment').value = '';
            document.getElementById('job-title-cert').value = '';
            document.getElementById('min-job-title-exp').value = '';
            document.getElementById('max-job-title-exp').value = '';

            // Optionally hide the popup after saving
            hideJobTitle('add-job-title-popup');
            populateJobTitles();
        } else {
            alert('Error saving job title!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function showEditJobTitlePopup(){
    const jobTitleSelect = document.getElementById('jobposting-job-title')
    currentJobTitle = jobTitleSelect.options[jobTitleSelect.selectedIndex].text; // Get the text

    console.log(currentJobTitle);
    if(currentJobTitle == "Choose a job title"){
        alert("Please select a job title to edit");
    }else{
        globalButtonSelector=false;
        showJobTitle();

        fetch(`getJobTitleData.php?selected_job_title=${currentJobTitle}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const jobTitleData = data.data;
                console.log(jobTitleData);

                // Populate the form fields with the retrieved data
                globalJobTitleId = jobTitleData.id;
                document.getElementById('job_title').value = jobTitleData.job_title;
                // Set readonly attribute to indicate job_title is not editable
                document.getElementById('job_title').setAttribute('readonly', 'true');
                document.getElementById('classification').value = jobTitleData.classification;
                populateSubClassifications();
                document.getElementById('subclassification').value = jobTitleData.subclassification;
                document.getElementById('gender').value = jobTitleData.gender;
                document.getElementById('educational_attainment').value = jobTitleData.educational_attainment;

                //If cert licenses is null (i.e., not required), not required checkbox should be ticked
                if(jobTitleData.cert_license == ""){
                    //TODO
                    document.getElementById('req-cert').value=false;
                    document.getElementById('req-cert').checked=true;
                    document.getElementById('job-title-cert').style.display = "none";
                }else{
                    document.getElementById('job-title-cert').value = jobTitleData.cert_license;
                    document.getElementById('req-cert').checked=false;
                    document.getElementById('job-title-cert').style.display = "block";
                }

                if((jobTitleData.min_years_of_experience == "0" && jobTitleData.max_years_of_experience == "0") || (jobTitleData.min_years_of_experience == "" && jobTitleData.max_years_of_experience == "")){
                    //TODO
                    document.getElementById('req-exp').value=false;
                    document.getElementById('req-exp').checked=true;
                    document.getElementById('min-job-title-exp').style.display = "none";
                    document.getElementById('max-job-title-exp').style.display = "none";
                }else{
                    // Populate years of experience
                    document.getElementById('min-job-title-exp').value = parseInt(jobTitleData.min_years_of_experience);
                    document.getElementById('max-job-title-exp').value = parseInt(jobTitleData.max_years_of_experience);
                    document.getElementById('req-exp').checked=false;
                    document.getElementById('min-job-title-exp').style.display = "block";
                    document.getElementById('max-job-title-exp').style.display = "block";
                }

                // Initialize skills input
                initializeSkillsInput('add-job-title-popup', 'jobposting-skills-input', 'add-jobposting-skills-container');

                // Clear any existing skills in the container
                const skillsContainer = document.querySelector('#add-jobposting-skills-container');
                const skillsInput = document.querySelector('#jobposting-skills-input');

                // Add fetched skills to the container
                jobTitleData.skills.forEach(skill => addSkill(skillsContainer, skill, skillsInput));

            } else {
                alert(data.message || 'Error fetching job title data.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function editJobTitle() {
    const jobTitle = document.getElementById('job_title').value;
    const classification = document.getElementById('classification').value;
    const subclassification = document.getElementById('subclassification').value;
    const gender = document.getElementById('gender').value;
    const educationalAttainment = document.getElementById('educational_attainment').value;
    const certLicense = document.getElementById('job-title-cert').value.trim();
    const minYearsOfExperience = document.getElementById('min-job-title-exp').value.trim();
    const maxYearsOfExperience = document.getElementById('max-job-title-exp').value.trim();
    const yearsOfExperience = `${minYearsOfExperience}-${maxYearsOfExperience}`;

    // Validation checks
    if (!jobTitle || !classification || !subclassification || !gender || !educationalAttainment) {
        alert('All required fields must be filled.');
        return;
    }

    // Convert the Set to an array if you're handling skills
    const skillsArray = Array.from(skillsSet); // Ensure this variable exists and is a Set

    // Create an object to hold the data
    const data = {
        job_title_id: globalJobTitleId, // Use globalJobTitleId for the update
        classification: classification,
        subclassification: subclassification,
        gender: gender,
        educational_attainment: educationalAttainment,
        cert_license: certLicense,
        years_of_experience: yearsOfExperience,
        skills: skillsArray // Include the skills array in the data object
    };
    console.log('Edit Job Payload: ', data);

    const jsonData = JSON.stringify(data); // Convert data to JSON string

    // Send data via AJAX to PHP
    fetch('editJobTitle.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData, // Send JSON data
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Job title edited and saved successfully!');
            hideJobTitle('add-job-title-popup'); // Optionally hide the popup
            populateJobTitles(); // Refresh the job titles list
        } else {
            console.error('Error:', result.error);
            alert('An error occurred while updating the job title: ' + result.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
D



function populateJobTitles() {
    fetch('get_job_titles.php')
        .then(response => response.json())
        .then(data => {
            const jobTitleSelect = document.getElementById('jobposting-job-title');
            jobTitleSelect.innerHTML = '<option value="" disabled selected>Choose a job title</option>'; // Clear and set default option
            
            data.forEach(job => {
                const option = document.createElement('option');
                option.value = job.job_title_id;  // You can use job_title_id as the value
                option.textContent = job.job_title; // Display the job title
                jobTitleSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching job titles:', error);
        });
}


// Partner Table adding job and job titles
function partner_showJobTitle() {
    const partner_btn1 = document.getElementById('partner-saveAndPostBtn1');
    const partner_btn2 = document.getElementById('partner-saveAndPostBtn2');
    const partner_btn3 = document.getElementById('partner-saveAndPostBtn3');

    if (globalButtonSelector == false) {
        // Remove the event listener for saveJobTitle
        partner_btn1.removeAttribute('onclick');
        partner_btn2.removeAttribute('onclick');
        partner_btn3.removeAttribute('onclick');
        // Add the event listener for editJobTitle
        partner_btn1.setAttribute('onclick', 'partner_editJobTitle()');
        partner_btn2.setAttribute('onclick', 'partner_editJobTitle()');
        partner_btn3.setAttribute('onclick', 'partner_editJobTitle()');
    } else {
        // Remove the event listener for editJobTitle
        partner_btn1.removeAttribute('onclick');
        partner_btn2.removeAttribute('onclick');
        partner_btn3.removeAttribute('onclick');
        // Add the event listener for saveJobTitle
        partner_btn1.setAttribute('onclick', 'partner_saveJobTitle()');
        partner_btn2.setAttribute('onclick', 'partner_saveJobTitle()');
        partner_btn3.setAttribute('onclick', 'partner_saveJobTitle()');
    }

    console.log(globalButtonSelector);

    // Update popup to use the prefixed partner popup ID
    document.getElementById('partner-add-job-title-popup').style.display = 'block';
    document.getElementById('partner-add-job-title-popup').classList.add('show');
    initializePopupPagination('partner-add-job-title-popup');
    document.getElementById('thirdPopup').style.display = 'none';
    document.getElementById('thirdPopup').classList.remove('show');
    initializeSkillsInput('partner-add-job-title-popup', 'partner-jobposting-search', 'partner-jobposting-skills-input', 'partner-add-jobposting-search-container', 'partner-add-jobposting-skills-container');
}


function partner_hideJobTitle() {
    // Hide partner-add-job-title-popup and show partner-popup
    document.getElementById('partner-add-job-title-popup').style.display = 'none';
    document.getElementById('partner-add-job-title-popup').classList.remove('show');
    document.getElementById('thirdPopup').style.display = 'block';
    document.getElementById('thirdPopup').classList.add('show');
    
    const jobTitle = document.getElementById('partner-job_title');
    jobTitle.removeAttribute('readonly');
    globalButtonSelector = true;

    // Remove all skill tags from the container but keep the input field
    const skillsContainer = document.querySelector('#partner-add-job-title-popup .partner-jobposting-skills-container');
    const skills = skillsContainer.querySelectorAll('.partner-jobposting-skill');
    skills.forEach(skill => skillsContainer.removeChild(skill));

    // Clear job title input field
    jobTitle.value = '';

    // Clear the skills set
    skillsSet.clear();

    // Clear the job title certification input field
    document.getElementById('partner-job-title-cert').value = '';

    // Clear the Name of Job input field
    document.getElementById('partner-edit-jobposting-partner-company').value = '';

    // Reset the Classification dropdown values
    document.getElementById('partner-classification').selectedIndex = 0; // Select the first option
    document.getElementById('partner-subclassification').selectedIndex = 0; // Select the first option

    // Clear the Gender radio buttons
    const genderRadios = document.querySelectorAll('input[name="partner-gender"]');
    genderRadios.forEach(radio => radio.checked = false);

    // Clear the Educational Attainment radio buttons
    const educRadios = document.querySelectorAll('input[name="partner-educ-level"]');
    educRadios.forEach(radio => radio.checked = false);
}


function partner_saveJobTitle() {

    const jobTitle = document.getElementById('partner-job_title').value.trim();
    const classification = document.getElementById('partner-classification').value;
    const subclassification = document.getElementById('partner-subclassification').value;
    const gender = document.getElementById('partner-gender').value;
    const educationalAttainment = document.getElementById('partner-educational_attainment').value;
    const certLicense = document.getElementById('partner-job-title-cert').value.trim();
    const minYearsOfExperience = document.getElementById('partner-min-job-title-exp').value.trim();
    const maxYearsOfExperience = document.getElementById('partner-max-job-title-exp').value.trim();
    const yearsOfExperience = `${minYearsOfExperience}-${maxYearsOfExperience}`;

    // Validation: Ensure all required fields are filled in
    if (!jobTitle) {
        alert('Job Title is required.');
        return;
    }
    if (!classification) {
        alert('Classification is required.');
        return;
    }
    if (!subclassification) {
        alert('Subclassification is required.');
        return;
    }
    if (!gender) {
        alert('Gender is required.');
        return;
    }
    if (!educationalAttainment) {
        alert('Educational Attainment is required.');
        return;
    }

    const skillsArray = Array.from(skillsSet); // Convert the Set to an array

    // Log the input values to ensure they are captured correctly
    console.log("Job Title:", jobTitle);
    console.log("Classification:", classification);
    console.log("Subclassification:", subclassification);
    console.log("Gender:", gender);
    console.log("Educational Attainment:", educationalAttainment);
    console.log("Cert/License:", certLicense);
    console.log("Years of Experience:", yearsOfExperience);
    console.log('Skills Array:', skillsArray);

    // Create an object to hold the data
    const data = {
        job_title: jobTitle,
        classification: classification,
        subclassification: subclassification,
        gender: gender,
        educational_attainment: educationalAttainment,
        cert_license: certLicense,
        years_of_experience: yearsOfExperience,
        skills: skillsArray
    };

    const jsonData = JSON.stringify(data); // Convert data to JSON string
    console.log(jsonData); // Debug: Print JSON string to console

    // Send data via AJAX to PHP
    fetch('save_job_title.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData, // Send JSON data
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Job title saved successfully!');
            
            // Clear all fields after successful save
            document.getElementById('partner-job_title').value = '';
            document.getElementById('partner-classification').value = '';
            document.getElementById('partner-subclassification').value = '';
            document.getElementById('partner-gender').value = '';
            document.getElementById('partner-educational_attainment').value = '';
            document.getElementById('partner-job-title-cert').value = '';
            document.getElementById('partner-min-job-title-exp').value = '';
            document.getElementById('partner-max-job-title-exp').value = '';

            // Optionally hide the popup after saving
            partner_hideJobTitle('partner-add-job-title-popup');
            populatePartnerJobTitles();
        } else {
            alert('Error saving job title!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function partner_showEditJobTitlePopup() {
    const jobTitleSelect = document.getElementById('partner-jobposting-job-title');
    currentJobTitle = jobTitleSelect.options[jobTitleSelect.selectedIndex].text; // Get the text

    console.log(currentJobTitle);
    if (currentJobTitle == "Choose a job title") {
        alert("Please select a job title to edit");
    } else {
        globalButtonSelector = false;
        partner_showJobTitle();

        fetch(`getJobTitleData.php?selected_job_title=${currentJobTitle}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const jobTitleData = data.data;
                console.log(jobTitleData);

                // Populate the form fields with the retrieved data
                globalJobTitleId = jobTitleData.id;
                document.getElementById('partner-job_title').value = jobTitleData.job_title;
                // Set readonly attribute to indicate job_title is not editable
                document.getElementById('partner-job_title').setAttribute('readonly', 'true');
                document.getElementById('partner-classification').value = jobTitleData.classification;
                populateSubClassifications();
                document.getElementById('partner-subclassification').value = jobTitleData.subclassification;
                document.getElementById('partner-gender').value = jobTitleData.gender;
                document.getElementById('partner-educational_attainment').value = jobTitleData.educational_attainment;

                //If cert licenses is null (i.e., not required), not required checkbox should be ticked
                if(jobTitleData.cert_license == ""){
                    //TODO
                    document.getElementById('partner-req-cert').value=false;
                    document.getElementById('partner-req-cert').checked=true;
                    document.getElementById('partner-job-title-cert').style.display = "none";
                }else{
                    document.getElementById('partner-job-title-cert').value = jobTitleData.cert_license;
                    document.getElementById('partner-req-cert').checked=false;
                    document.getElementById('partner-job-title-cert').style.display = "block";
                }

                if((jobTitleData.min_years_of_experience == "0" && jobTitleData.max_years_of_experience == "0") || (jobTitleData.min_years_of_experience == "" && jobTitleData.max_years_of_experience == "")){
                    //TODO
                    document.getElementById('partner-req-exp').value=false;
                    document.getElementById('partner-req-exp').checked=true;
                    document.getElementById('partner-min-job-title-exp').style.display = "none";
                    document.getElementById('partner-max-job-title-exp').style.display = "none";
                }else{
                    // Populate years of experience
                    document.getElementById('partner-min-job-title-exp').value = parseInt(jobTitleData.min_years_of_experience);
                    document.getElementById('partner-max-job-title-exp').value = parseInt(jobTitleData.max_years_of_experience);
                    document.getElementById('partner-req-exp').checked=false;
                    document.getElementById('partner-min-job-title-exp').style.display = "block";
                    document.getElementById('partner-max-job-title-exp').style.display = "block";
                }

                // Initialize skills input
                initializeSkillsInput('partner-add-job-title-popup', 'partner-jobposting-skills-input', 'partner-add-jobposting-skills-container');

                // Clear any existing skills in the container
                const skillsContainer = document.querySelector('#partner-add-jobposting-skills-container');
                const skillsInput = document.querySelector('#partner-jobposting-skills-input');

                // Add fetched skills to the container
                jobTitleData.skills.forEach(skill => addSkill(skillsContainer, skill, skillsInput));

            } else {
                alert(data.message || 'Error fetching job title data.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function partner_editJobTitle() {
    const jobTitle = document.getElementById('partner-job_title').value;
    const classification = document.getElementById('partner-classification').value;
    const subclassification = document.getElementById('partner-subclassification').value;
    const gender = document.getElementById('partner-gender').value;
    const educationalAttainment = document.getElementById('partner-educational_attainment').value;
    const certLicense = document.getElementById('partner-job-title-cert').value.trim();
    const minYearsOfExperience = document.getElementById('partner-min-job-title-exp').value.trim();
    const maxYearsOfExperience = document.getElementById('partner-max-job-title-exp').value.trim();
    const yearsOfExperience = `${minYearsOfExperience}-${maxYearsOfExperience}`;

    // Validation checks
    if (!jobTitle || !classification || !subclassification || !gender || !educationalAttainment) {
        alert('All required fields must be filled.');
        return;
    }

    // Convert the Set to an array if you're handling skills
    const skillsArray = Array.from(skillsSet); // Ensure this variable exists and is a Set

    // Create an object to hold the data
    const data = {
        job_title_id: globalJobTitleId, // Use globalJobTitleId for the update
        classification: classification,
        subclassification: subclassification,
        gender: gender,
        educational_attainment: educationalAttainment,
        cert_license: certLicense,
        years_of_experience: yearsOfExperience,
        skills: skillsArray // Include the skills array in the data object
    };
    console.log('Edit Job Payload: ', data);

    const jsonData = JSON.stringify(data); // Convert data to JSON string

    // Send data via AJAX to PHP
    fetch('editJobTitle.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData, // Send JSON data
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Job title edited and saved successfully!');
            partner_hideJobTitle('partner-add-job-title-popup'); // Optionally hide the popup
            partner_populateJobTitles(); // Refresh the job titles list
        } else {
            console.error('Error:', result.error);
            alert('An error occurred while updating the job title: ' + result.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function populatePartnerJobTitles() {
    fetch('get_job_titles.php')
        .then(response => response.json())
        .then(data => {
            const jobTitleSelect = document.getElementById('partner-jobposting-job-title');
            jobTitleSelect.innerHTML = '<option value="" disabled selected>Choose a job title</option>'; // Clear and set default option
            
            data.forEach(job => {
                const option = document.createElement('option');
                option.value = job.job_title_id;  // You can use job_title_id as the value
                option.textContent = job.job_title; // Display the job title
                jobTitleSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching job titles:', error);
        });
}
// Call this function when the page loads or when needed to populate the dropdown
document.addEventListener('DOMContentLoaded', populateJobTitles);

function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');

    // Remove 'active' from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add 'active' to the clicked tab
    const activeTab = document.querySelector(`.tab[onclick="openTab('${tabName}')"]`);
    if (activeTab) activeTab.classList.add('active');

    // Update the URL with the selected tab
    const url = new URL(window.location);
    url.searchParams.set('tab', tabName);
    window.history.pushState({}, '', url);
}

// Load the correct tab on page load based on the URL parameter
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabName = urlParams.get('tab') || 'pending'; // Default to 'pending' if no tab is specified
    openTab(tabName);
});

function confirmLogout() {
    // Use the confirm dialog
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = 'logout.php'; // Redirect to logout script
    }
}

function showDialogDelete(employeeId) {
    // Confirm deletion
    if (confirm("Are you sure you want to delete this employee?")) {
        deleteEmployee(employeeId);
    }
}

function deleteEmployee(employeeId) {
    // Send a request to delete the employee
    fetch('deleteEmployee.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id: employeeId }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert('Employee deleted successfully!');
            // Optionally refresh the employee list
            fetchData('fetch_employees.php', populateEmployeesTable);
        } else {
            console.error('Error:', data.error);
            alert('An error occurred while deleting the employee: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the employee.');
    });
}
