<!DOCTYPE html>
<html>
    <head>
        <title>RCVJ, Inc.</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="mediaqueries.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    </head>
    <body>
        <!--Desktop Nav-->
        <nav class="desktopnav" id="desktop-nav">
            <div class="logo">
                <img src="images/logo.png" alt="">
            </div>
            <div>
                <ul class="nav-links">
                    <li><a href="Home.php">Home</a></li>
                    <li><a href="Jobs.php">Jobs</a></li>
                    <li><a href="About.php">About</a></li>
                    <li><a href="Partner.php">Partner Companies</a></li>
                </ul>
            </div>
            <div class="nav-acc">
                <div class="notification_wrap">
                    <div class="notification_icon">
                        <i class="fas fa-bell"></i>
                    </div>
                    <div class="dropdown">
                        <div class="notify_item">
                            <div class="notify_info">
                                <p>Application on <span>[JOB TITLE]</span> was rejected.</p>
                                <span class="company_name">Company Name</span>
                            </div>
                        </div>
                        <div class="notify_item">
                            <div class="notify_info">
                                <p>Interview on <span>[JOB TITLE]</span> was scheduled.</p>
                                <span class="company_name">Company Name</span>
                            </div>
                        </div>
                        <div class="notify_item">
                            <div class="notify_info">
                                <p>Deployment on <span>[JOB TITLE]</span> is in process.</p>
                                <span class="company_name">Company Name</span>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="images/user.svg" alt="">
                <button id="profile" onclick="redirectTo('UserProfile.php')">User Name</button>
            </div>
        </nav>

        <!---Burger Nav-->
        <nav id="hamburger-nav">
            <div class="logo">
                <img src="images/logo.png" alt="">
            </div>
            <div class="hamburger-menu">
                <div class="nav-icons">
                    <div class="notification_wrap">
                        <div class="notification_icon">
                            <i class="fas fa-bell"></i>
                        </div>
                        <div class="dropdown">
                            <div class="notify_item">
                                <div class="notify_info">
                                    <p>Application on <span>[JOB TITLE]</span> was rejected.</p>
                                    <span class="company_name">Company Name</span>
                                </div>
                            </div>
                            <div class="notify_item">
                                <div class="notify_info">
                                    <p>Interview on <span>[JOB TITLE]</span> was scheduled.</p>
                                    <span class="company_name">Company Name</span>
                                </div>
                            </div>
                            <div class="notify_item">
                                <div class="notify_info">
                                    <p>Deployment on <span>[JOB TITLE]</span> is in process.</p>
                                    <span class="company_name">Company Name</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hamburger-icon" onclick="toggleMenu()">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="menu-links">
                    <li><a class="active" href="#" onclick="toggleMenu()">Home</a></li>
                    <li><a href="Jobs.php" onclick="toggleMenu()">Jobs</a></li>
                    <li><a href="About.php" onclick="toggleMenu()">About</a></li>
                    <li><a href="Partner.php" onclick="toggleMenu()">Partner Companies</a></li>
                    <div class="nav-acc">
                        <img src="images/user.svg" alt="">
                        <button id="profile">User Name</button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Content -->
        <section class="myjobs-section">
            <div class="main-container">
                <div class="back-button">
                    <a href="#" onclick="history.back()">
                        <i class="fas fa-arrow-left"></i>Back
                    </a>
                </div>
                <h1 class="title1">My Jobs</h1>
                <div class="tabs">
                    <div class="tab active" onclick="openTab('applied')">Applied</div>
                    <div class="tab" onclick="openTab('interview')">Interview</div>
                    <div class="tab" onclick="openTab('currentjob')">Current Job</div>
                </div>

                <div id="applied" class="tab-content active">
                    <ul class="job-list">
                        <li>
                            <div class="jobs-card" onclick="redirectTo('JobDetails.php')">
                                <div class="job-header">
                                    <h3 id="job-title">Job Title</h3>
                                    <h4 id="available">(14)</h4>
                                </div>
                                <div class="company-box">
                                    <p id="location"><i class="fas fa-map-marker-alt"></i>Location</p>
                                    <p id="date"><i class="fas fa-calendar-alt"></i>MM/DD/YYYY</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="jobs-card" onclick="redirectTo('JobDetails.php')">
                                <div class="job-header">
                                    <h3 id="job-title">Job Title</h3>
                                    <h4 id="available">(14)</h4>
                                </div>
                                <div class="company-box">
                                    <p id="location"><i class="fas fa-map-marker-alt"></i>Location</p>
                                    <p id="date"><i class="fas fa-calendar-alt"></i>MM/DD/YYYY</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="empty-message" style="display: none;">
                        <img src="images/findjobs.png" alt="">
                        <p>You haven't applied for a job.<br>Look for jobs.</p>
                        <button onclick="redirectTo('Jobs.php')">Find Jobs</button>
                    </div>
                </div>

                <div id="interview" class="tab-content">
                    <ul class="job-list">
                        <!-- Job items will be dynamically added here -->
                    </ul>
                    <div class="empty-message" style="display: none;">
                        <img src="images/findjobs.png" alt="">
                        <p>You have no scheduled interviews.<br>Look for jobs.</p>
                        <button onclick="redirectTo('Jobs.php')">Find Jobs</button>
                    </div>
                </div>

                <div id="currentjob" class="tab-content">
                    <ul class="job-list">
                        <li>
                            <div class="jobs-card" onclick="redirectTo('JobDetails.php')">
                                <div class="job-header">
                                    <h3 id="job-title">Job Title</h3>
                                    <h4 id="available">(14)</h4>
                                </div>
                                <div class="company-box">
                                    <p id="location"><i class="fas fa-map-marker-alt"></i>Location</p>
                                    <p id="date"><i class="fas fa-calendar-alt"></i>MM/DD/YYYY</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="empty-message" style="display: none;">
                        <img src="images/findjobs.png" alt="">
                        <p>You have no current jobs.<br>Look for jobs.</p>
                        <button onclick="redirectTo('Jobs.php')">Find Jobs</button>
                    </div>
                </div>
            </div>
        </section>

        <div class="shape-container2">
            <div class="rectangle-4"></div>
            <div class="rectangle-5"></div>
        </div>

        <footer class="footer-distributed">
            <div class="footer-left">
                <a href="#"><img src="images/logo.png" alt="Company Logo"></a>
                <p class="footer-company-name">Copyright © 1992 <strong>RCVJ, Inc.</strong></p>
            </div>
            <div class="footer-center">
                <div>
                    <i class="fa fa-map-marker"></i>
                    <p><span>Dasmariñas, Philippines</span> 3rd Floor RCVJ Bldg. Don P. Campos Ave.</p>
                </div>
                <div>
                    <i class="fa fa-phone"></i>
                    <p>(046) 416 0708</p>
                </div>
                <div>
                    <i class="fa fa-envelope"></i>
                    <p><a href="mailto:rcvj1992.recruitment@gmail.com">rcvj1992.recruitment@gmail.com</a></p>
                </div>
            </div>
            <div class="footer-right">
                <p class="footer-company-about">
                    <span>Contact Us</span>
                <div class="footer-icons">
                    <a href="https://www.facebook.com/RCVJInc1992"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.linkedin.com/in/rcvj-inc-6b5599184/?originalSubdomain=ph"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </footer>

        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script defer src="script.js"></script>
    </body>
</html>