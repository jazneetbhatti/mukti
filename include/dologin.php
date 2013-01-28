<!DOCTYPE html>
<html>
<head>
	<!-- May The Source Be With You -->
	<meta charset="utf-8">
	<title>Mukti '13</title>
	<link rel="stylesheet" href="../stylesheets/reset.css">
	<link rel="stylesheet" href="../stylesheets/layout.css">
	<link rel="stylesheet" href="../stylesheets/style.css">
	<link rel="shortcut icon" href="../favicon.ico">
  	<link rel="icon" type="image/gif" href="../animated_favicon1.gif">
<!-- longlivelinux -->
</head>
<body>

<div id="register-login-text-wrapper">
<?php
	require("./config.php");
	require("./utility.php");
	session_start();
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		if(isset($_POST['register']))
		{
			header( "refresh:15;url=../index.php" );
			//input validation and register user
			$myemailid = addslashes($_POST['email']);
			$sql = "SELECT email_id FROM registered_users WHERE email_id='$myemailid'";
			$result = mysql_query($sql) or die(mysql_error());
			$row = mysql_fetch_array($result);
			$count = mysql_num_rows($result);
			if($count == 0)
			{
				$myname = addslashes($_POST['name']);
				$mypassword = addslashes($_POST['password']);
				$mypassword = md5($mypassword);
				$myphone = addslashes($_POST['phone']);
				$mydepartment = addslashes($_POST['department']);
				$mycity = addslashes($_POST['city']);
				$myyear = addslashes($_POST['year_of_study']);
				$mycollege = addslashes($_POST['college']);
				$confirmationcode = MakeConfirmationMd5($myemailid);
				mysql_query("INSERT INTO registered_users(email_id, name, college, phone, password, confirmation_code, department, year_of_study, city) VALUES('$myemailid', '$myname', '$mycollege', '$myphone', '$mypassword', '$confirmationcode', '$mydepartment', '$myyear', '$mycity')") or die(mysql_error());

				// registered successfully
				SendUserConfirmationEmail($myemailid, $myname, $confirmationcode);
				$message = "<div id=\"register-login-text\"><p>Registered successfully. Please check your mail for the activation link.</p><p>In case you don't receive the mail, contact us at <a href=\"mailto:admin@mkti.in\" text-decoration:none>admin@mkti.in</a>.</p><br /><br /><p>This page will automatically redirect to the <a href=\"../index.php\" >mkti.in</a> in <span id=\"timer\">15 seconds<span></p></div>";
				echo $message;
			}
			else
			{
				$error = "<div id=\"register-login-text\"><br /><p>This email has already been registered.</p><br /><p>This page will automatically redirect to the <a href=\"../index.php\" >mkti.in</a> in <span id=\"timer\">15 seconds<span></p></div>";
				echo $error;
			}
		}
		else if(isset($_POST['signin']))
		{
			//check login credentials
			$myemailid = addslashes($_POST['email']);
			$mypassword = addslashes($_POST['password']);
			$mypassword = md5($mypassword);
			$sql = "SELECT email_id, name, id FROM registered_users WHERE email_id='$myemailid' and password='$mypassword' and confirmation_code='y'";
			$result = mysql_query($sql) or die(mysql_error());
			$row = mysql_fetch_array($result);
			$myname = $row['name'];
			$userid = $row['id'];
			$count = mysql_num_rows($result);
			
			if($count == 1)
			{
				$_SESSION['login_email_id'] = $myemailid;
				$_SESSION['login_name'] = $myname;
				$_SESSION['user_id'] = $userid;
				header("location: ../index.php");
			}
			else
			{
				header( "refresh:15;url=../index.php" );
				$error = "<div id=\"register-login-text\"><p>Invalid username/password</p><br /><p>This page will automatically redirect to the <a href=\"../index.php\" >mkti.in</a> in <span id=\"timer\">15 seconds<span></p></div>";
				echo $error;
			}
		}
		else 
		{
			header( "refresh:15;url=../index.php" );
			$error = "<div id=\"register-login-text\"><p>Invalid Page Requested</p><br /><p>This page will automatically redirect to the <a href=\"../index.php\" >mkti.in</a> in <span id=\"timer\">15 seconds<span></p></div>";
			echo $error;
		}
	}
	else if($_SERVER["REQUEST_METHOD"] == "GET")
	{
		if(isset($_GET['code']))
		{
			//check validity of activation code
			$confirmationcode = $_GET['code'];
			$sql = "SELECT email_id, name, id FROM registered_users WHERE confirmation_code='$confirmationcode'";
			$result = mysql_query($sql) or die(mysql_error());
			$row = mysql_fetch_array($result);
			$myname = $row['name'];
			$userid = $row['id'];
			$count = mysql_num_rows($result);
			
			if($count == 1)
			{
				$sql = "UPDATE registered_users SET confirmation_code='y' WHERE confirmation_code='$confirmationcode'";
				$result = mysql_query($sql) or die(mysql_error());
				$_SESSION['login_email_id'] = $myemailid;
				$_SESSION['login_name'] = $myname;
				$_SESSION['user_id'] = $userid;
				header("location: ../index.php");
			}
			else
			{
				header( "refresh:15;url=../index.php" );	
				$error = "<div id=\"register-login-text\"><p>Invalid/Expired confirmation code.</p><br /><p>This page will automatically redirect to the <a href=\"../index.php\" >mkti.in</a> in <span id=\"timer\">15 seconds<span></p></div>";
				echo $error;
			}
		}
		else
		{
			header( "refresh:15;url=../index.php" );
			$error = "<div id=\"register-login-text\"><p>Invalid Page Requested</p><br /><p>This page will automatically redirect to the <a href=\"../index.php\" >mkti.in</a> in <span id=\"timer\">15 seconds<span></p></div>";
			echo $error;
		}
	}
	else
	{
		header( "refresh:15;url=../index.php" );
		$error = "<div id=\"register-login-text\"><p>Invalid Page Requested.</p><br /><p>This page will automatically redirect to the <a href=\"../index.php\" >mkti.in</a> in <span id=\"timer\">15 seconds<span></p></div>";
		echo $error;
	}
?>
</div>
	<div id="container">
		<div id="header">
			<div id="logo-wrapper">
				<div id="club-logo"></div>
				<div id="college-logo"></div>
				<div id="banner-text">Mukti '13</div>
			</div>
		</div>


		<div id="wrapper">

		</div>

		<div id="footer">
			<div id="footer-wrapper">
				<div class="footer-column">
					<h4>Follow Us</h4>
					<ul id="footer-follow">
						<li>
							<a href="http://www.facebook.com/muktinitdurgapur" id="facebook" title="Facebook" target="_blank">
								Facebook
								<span></span>								
							</a>

						</li>

						<li>
							<a href="https://twitter.com/mukti_nitd" id="twitter" title="Twitter" target="_blank">
								Twitter
								<span></span>
							</a>

						</li>

<!--						<li>
							<a href="http://www.mkti.in" id="googleplus" title="Google+" target="_blank">
								Google+
								<span></span>
							</a>

			</li> -->
					</ul>
				</div>

				<div class="footer-column">
					<h4>License</h4>

					<p>Copyleft 
						<span style="-moz-transform: scaleX(-1); -o-transform: scaleX(-1); -webkit-transform: scaleX(-1); transform: scaleX(-1); display: inline-block;">
    &copy;</span> 2013 This site has been developed and is maintained by GNU/Linux Users' Group NIT Durgapur
    			</p>
				</div>

<!--				<div class="footer-column">
					<h4>Mailing List</h4>

					<p>Subscribe to the NITDGPLUG mailing list</p>

					<form action="http://groups.google.com/group/nitdgplug/boxsubscribe" method="get" target="_blank" id="mailing-list">
						<div>
							<input type="text" name="email" class="clear" value="Enter your email address">
						</div>

						<div>
							<input type="submit" class="submit" value="Go">
						</div>
					</form>
</div> -->
			</div>
		</div>
	</div>
<script>
  var count = 15, unit;

  var counter = setInterval(timer, 1000);

  function timer()
  {
    count = count - 1;
    if( count <= 0 )
      clearInterval(counter);
    if( count == 1 )
      unit = ' second';
    else
      unit = ' seconds';

    document.getElementById("timer").innerHTML = count + unit;
  }
</script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-28325602-1']);
  _gaq.push(['_setDomainName', 'mkti.in']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

</body>
</html>

