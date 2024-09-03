<?php
session_start();

if (isset($_SESSION['user'])) {
    // Fetch user's full name from the session
    $user_email = $_SESSION['user'];

    $servername = "localhost";
    $username = "root";
    $password = "12345";
    $dbname = "admin_database";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT fname, lname FROM applicant_table WHERE email = '$user_email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $user_name = $user['fname'] . ' ' . $user['lname'];
    } else {
        $user_name = 'User';
    }

    $conn->close();
} else {
    $user_name = 'Sign Up';
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>RCVJ, Inc.</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="mediaqueries.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
                <li><a class="active" href="#">Jobs</a></li>
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
                            <p>Application on<span>[JOB TITLE]</span>was rejected.</p>
                            <span class="company_name">Company Name</span>
                        </div>
                    </div>
                    <div class="notify_item">
                        <div class="notify_info">
                            <p>Interview on<span>[JOB TITLE]</span>was scheduled.</p>
                            <span class="company_name">Company Name</span>
                        </div>
                    </div>
                    <div class="notify_item">
                        <div class="notify_info">
                            <p>Deployment on<span>[JOB TITLE]</span>is on process.</p>
                            <span class="company_name">Company Name</span>
                        </div>
                    </div>
                </div>
            </div>
                <img src="images/user.svg" alt="">
                <button onclick="redirectTo('UserProfile.php')"><?php echo htmlspecialchars($user_name); ?></button>
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
                                    <p>Application on<span>[JOB TITLE]</span>was rejected.</p>
                                    <span class="company_name">Company Name</span>
                                </div>
                            </div>
                            <div class="notify_item">
                                <div class="notify_info">
                                    <p>Interview on<span>[JOB TITLE]</span>was scheduled.</p>
                                    <span class="company_name">Company Name</span>
                                </div>
                            </div>
                            <div class="notify_item">
                                <div class="notify_info">
                                    <p>Deployment on<span>[JOB TITLE]</span>is on process.</p>
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
                    <li><a href="Home.php" onclick="toggleMenu()">Home</a></li>
                    <li><a class="active" href="#" onclick="toggleMenu()">Jobs</a></li>
                    <li><a href="About.php" onclick="toggleMenu()">About</a></li>
                    <li><a href="Partner.php" onclick="toggleMenu()">Partner Companies</a></li>
                    <div class="nav-acc">
                        <img src="images/user.svg" alt="">
                        <button onclick="redirectTo('UserProfile.php')">Sign Up</button>
                    </div>
                </div>
            </div>
        </nav>

        <section class="jobs-section">  
            <div class="main-container">
                <div class="jobs-header">
                    <h1 class="title6">Be part of <span style="color: #2C1875;">RCVJ, Inc.</span></h1>
                    <img src="images/jobs.png" alt="">
                </div>

                <!--Search Bar-->
                <div class="search-container">
                    <div class="search-box">
                        <div class="search-input" id="job-title">
                            <i class="search-icon fas fa-search"></i>
                            <input type="text" placeholder="Job title, keywords, or company">
                        </div>
                        <div class="search-input" id="location">
                            <i class="search-icon fas fa-map-marker-alt"></i>
                            <input type="text" placeholder="City, state, zip code, or 'remote'">
                        </div>
                    </div>
                    <button class="search-button">Search</button>
                </div>
                
                <!--List of Jobs-->
                <div class="jobs-main-container">
                    <ul>
                    <?php
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            echo '<li>';
                            echo '<div class="jobs-card" onclick="window.location.href=\'JobDetails.php?id=' . $row["id"] . '\'">';
                            echo '<div class="job-header">';
                            echo '<h3 id="job-title">' . $row["job_title"] . '</h3>';
                            echo '<h4 id="available">(' . $row["job_candidates"] . ')</h4>';
                            echo '</div>';
                            echo '<div class="company-box">';
                            echo '<p style="margin-top: 5px" id="company-name">' . $row["company_name"] . '</p>';
                            echo '<p id="location">' . $row["job_location"] . '</p>';
                            echo '</div>';
                            echo '<div class="desc-box">';
                            echo '<h4>Job Description</h4>';
                            echo '<p id="description">' . $row["job_description"] . '</p>';
                            echo '</div>';
                            echo '</div>';
                            echo '</li>';
                        }
                    } else {
                        echo '<li>No jobs found.</li>';
                    }
                    $conn->close();
                    ?>
                    </ul>
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
                    <p><span>Dasmariñas, Philippines</span>
                        3rd Floor RCVJ Bldg. Don P. Campos Ave.</p>
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