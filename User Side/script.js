function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

  function redirectTo(url) {
    window.location.href = url;
}

function openTab(tabName) {
  var i, tabcontent, tabs;
  tabcontent = document.getElementsByClassName('tab-content');
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('active');
  }
  tabs = document.getElementsByClassName('tab');
  for (i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  event.currentTarget.classList.add('active');
}

$(document).ready(function(){
  $(".notification_icon .fa-bell").click(function(){
    $(".dropdown").toggleClass("active");
  })
});

$(document).ready(function(){
  $(".notification_icon .fa-bell").click(function(){
      $(this).siblings(".dropdown").toggleClass("active");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry => {
    console.log(entry)
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  }));
});

function checkTabContent() {
  const tabContents = document.querySelectorAll('.tab-content');

  tabContents.forEach(tab => {
      const jobList = tab.querySelector('.job-list');
      const emptyMessage = tab.querySelector('.empty-message');

      if (jobList.children.length === 0) {
          jobList.style.display = 'none';
          emptyMessage.style.display = 'flex';
      } else {
          jobList.style.display = 'relative';
          emptyMessage.style.display = 'none';
      }
  });
}

function openTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
      tab.classList.remove('active');
  });

  tabContents.forEach(content => {
      content.classList.remove('active');
  });

  document.querySelector(`.tab[onclick="openTab('${tabName}')"]`).classList.add('active');
  document.getElementById(tabName).classList.add('active');
  checkTabContent(); // Call to update empty message visibility
}

/*Sidenav*/
/*Sidenav Open and Close*/
function openNav(sidenavId, containerId) {
  document.getElementById(sidenavId).classList.add('active');
  document.getElementById(containerId).style.opacity = "0.1";
  document.body.classList.add('no-scroll', 'overlay-active');
}

function closeNav(sidenavId, containerId) {
  document.getElementById(sidenavId).classList.remove('active');
  document.getElementById(containerId).style.opacity = "1";
  document.body.classList.remove('no-scroll', 'overlay-active');
}

/*Add Skills*/
document.getElementById('add_skill_btn').addEventListener('click', addSkill);

document.getElementById('skills').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission behavior
        addSkill();
    }
});

document.addEventListener('DOMContentLoaded', function() {
  var ul = document.getElementById('added_skills_list');
  
  // Populate the skills list from userSkills
  userSkills.forEach(function(skill) {
      var li = document.createElement('li');
      li.innerHTML = 
        `<span>${skill}</span>
         <button class="close-btn">&times;</button>`;
      ul.appendChild(li);

      // Add event listener to the close button
      li.querySelector('.close-btn').addEventListener('click', function() {
          li.remove();
      });
  });
});

function addSkill() {
    var skillInput = document.getElementById('skills');
    var skillValue = skillInput.value.trim();

    if (skillValue !== '') {
        var ul = document.getElementById('added_skills_list');
        var li = document.createElement('li');
        li.innerHTML = 
          `<span>${skillValue}</span>
          <button class="close-btn">&times;</button>`;
        ul.appendChild(li);
        skillInput.value = '';

        // Add event listener to the close button
        li.querySelector('.close-btn').addEventListener('click', function() {
            li.remove();
        });
    }
}

document.getElementById('skills_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather skills from the list
    var skills = [];
    document.querySelectorAll('#added_skills_list li span').forEach(function(span) {
        skills.push(span.textContent.trim());
    });

    // Convert skills to JSON format
    var skillsJson = JSON.stringify(skills);

    // Create a hidden input to include skills in the form submission
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'skills_json';
    hiddenInput.value = skillsJson;
    this.appendChild(hiddenInput);

    // Submit the form
    this.submit();
});

/*Add Course Highlight*/
document.getElementById('add_highlight_button').addEventListener('click', function() {
  var highlightInput = document.getElementById('course_highlights');
  var highlightValue = highlightInput.value.trim();

  if (highlightValue !== '') {
      var ul = document.getElementById('highlights_list');
      var li = document.createElement('li');
      li.innerHTML = `
        <span>${highlightValue}</span>
        <button class="close-btn">&times;</button>
      `;
      ul.appendChild(li);
      highlightInput.value = '';

      // Add event listener to the close button
      li.querySelector('.close-btn').addEventListener('click', function() {
        li.remove();
      });
  }
});

document.getElementById('education_form').addEventListener('submit', function(event) {
  event.preventDefault();
  // Handle form submission logic here
});


/*Resume Dropbox*/
document.addEventListener('DOMContentLoaded', function () {
  var dropbox = document.getElementById('resume_dropbox');
  var fileInput = document.getElementById('fileInput');
  var filePreview = document.getElementById('filePreview'); // New element for file preview

  dropbox.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropbox.classList.add('dragover'); // Added class to change color
  });

  dropbox.addEventListener('dragleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropbox.classList.remove('dragover'); // Removed class to revert color
  });

  dropbox.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropbox.classList.remove('dragover'); // Removed class to revert color

    var files = e.dataTransfer.files;
    fileInput.files = files;
    handleFiles(files); // Call handleFiles to preview files
  });

  fileInput.addEventListener('change', function () {
    handleFiles(fileInput.files); // Call handleFiles to preview files
  });

  // New function to handle file previews
  function handleFiles(files) {
    filePreview.innerHTML = ''; // Clear previous previews
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var fileNameElement = document.createElement('div');
      fileNameElement.classList.add('file-name');
      fileNameElement.textContent = file.name;
      filePreview.appendChild(fileNameElement);
    }
  }
});

/*Resume Dialog Popup*/
const dialog = document.getElementById("submit_dialog");
function submitForm(){
  
  dialog.showModal();
}

function closeSubmitDialog(){
  dialog.close();
}

function populateJobExperience(job) {
  // Set the job experience ID in the hidden field
  document.querySelector('input[name="job_experience_id"]').value = job.job_experience_id;

  // Set the job title and company name
  document.getElementById('job-title').value = job.job_title;
  document.getElementById('company-name-field').value = job.company_name;

  // Set the started date
  document.getElementById('month_started').value = job.month_started;
  document.getElementById('year_started').value = job.year_started;

  // Set the ended date
  document.getElementById('month_ended').value = job.month_ended;
  document.getElementById('year_ended').value = job.year_ended;

  // Set the career history
  document.getElementById('career_history').value = job.career_history;
}

function resetJobExperienceForm() {
  // Clear the hidden field
  document.querySelector('input[name="job_experience_id"]').value = '';

  // Clear job title and company name
  document.getElementById('job-title').value = '';
  document.getElementById('company-name-field').value = '';

  // Reset the started date
  document.getElementById('month_started').selectedIndex = 0; // Set to "Select Month"
  document.getElementById('year_started').selectedIndex = 0; // Set to "Select Year"

  // Reset the ended date
  document.getElementById('month_ended').selectedIndex = 0; // Set to "Select Month"
  document.getElementById('year_ended').selectedIndex = 0; // Set to "Select Year"

  // Clear the career history
  document.getElementById('career_history').value = '';
}

function deleteJobExperience(jobExperienceId) {
  if (confirm('Are you sure you want to delete this job experience?')) {
      // Create a form to submit the deletion request
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = ''; // Submit to the same page

      // Create a hidden input for the job experience ID
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'job_experience_id';
      input.value = jobExperienceId;

      // Create a hidden input to identify the deletion action
      const deleteInput = document.createElement('input');
      deleteInput.type = 'hidden';
      deleteInput.name = 'delete_job_experience';
      deleteInput.value = '1';

      // Append inputs to the form
      form.appendChild(input);
      form.appendChild(deleteInput);

      // Append the form to the body and submit it
      document.body.appendChild(form);
      form.submit();
  }
}

function populateLicense(license) {
  // Set the license ID in the hidden field
  document.querySelector('input[name="license_id"]').value = license.id;

  // Set the license name
  document.getElementById('license').value = license.license_name;

  // Set the issued date
  document.getElementById('month_issued').value = license.month_issued;
  document.getElementById('year_issued').value = license.year_issued;

  // Set the expiration date
  document.getElementById('month_expired').value = license.month_expired;
  document.getElementById('year_expired').value = license.year_expired;
}

function resetLicenseForm() {
  // Clear the hidden field
  document.querySelector('input[name="license_id"]').value = '';

  // Clear license name
  document.getElementById('license_name').value = '';

  // Reset the issued date
  document.getElementById('month_issued').selectedIndex = 0; // Set to "Select Month"
  document.getElementById('year_issued').selectedIndex = 0; // Set to "Select Year"

  // Reset the expiration date
  document.getElementById('month_expired').selectedIndex = 0; // Set to "Select Month"
  document.getElementById('year_expired').selectedIndex = 0; // Set to "Select Year"
}

function deleteLicense(licenseId) {
  if (confirm('Are you sure you want to delete this license?')) {
      // Create a form to submit the deletion request
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = ''; // Submit to the same page

      // Create a hidden input for the license ID
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'license_id';
      input.value = licenseId;

      // Create a hidden input to identify the deletion action
      const deleteInput = document.createElement('input');
      deleteInput.type = 'hidden';
      deleteInput.name = 'delete_license';
      deleteInput.value = '1';

      // Append inputs to the form
      form.appendChild(input);
      form.appendChild(deleteInput);

      // Append the form to the body and submit it
      document.body.appendChild(form);
      form.submit();
  }
}