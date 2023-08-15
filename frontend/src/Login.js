import React from 'react';
import './Login.css';

/* Components */

// Login: Displays the list of projects to page
class Login extends React.Component {

    // render: Structure the login page
    render() {
        return (
            <div className="login_wrap">
                <p className="project_title"
                    data-testid="page-title">
                    Login
                </p>
                <LoginUser
                    onLoginClick={() => this.handleLogin()}
                    onGuestClick={() => this.handleGuestLogin()}
                    onRegisterClick={() => this.handleRegister()}
                    onHidePasswordClick={() => this.handleHidePassword()} />
                <div className="empty_space" />
            </div>
        )
    }

    /* Handlers */

    // handleLogin: Determine whether a valid account is entered
    handleLogin() {
        /* Obtain username and password */
        const id = document.getElementById("id_login").value;
        const user = document.getElementById("user_login").value;
        const pass = document.getElementById("password_login").value;

        /* Make sure inputs are not empty */
        if(typeof id === 'string' && typeof user === 'string' && typeof pass === 'string') {
			if(id.trim() !== '' && user.trim() !== '' && pass.trim() !== '') {
                this.props.handleLoginStatus(true, id, user);
                return true;
            }
            else {
                alert("Information is incomplete. Please provide all credentials.");
            }
            return false;
        }
        return false;
    }

    // handleLogin: Give user a guest account
    handleGuestLogin() {
        this.props.handleLoginStatus(true, "you", "guest");
    }

    // handleRegister: Register a new user, unless user id is same as someone else
    handleRegister() {
        /* Obtain username and password */
        const id = document.getElementById("id_login").value;
        const user = document.getElementById("user_login").value;
        const pass = document.getElementById("password_login").value;

        /* Make sure inputs are not empty */
        if(typeof id === 'string' && typeof user === 'string' && typeof pass === 'string') {
			if(id.trim() !== '' && user.trim() !== '' && pass.trim() !== '') {
                this.props.handleLoginStatus(true, id, user);
                alert("You account has been created. Remember your credentials!");
            }
            else {
                this.props.handleLoginStatus(true, "you", "Guest");
            }
        }
    }

    handleHidePassword() {
        var chk = document.getElementById("password_login");
        if (chk.type === "password") {
            chk.type = "text";
        }
        else {
            chk.type = "password";
        }
    }

}

/* HTML */

// LoginUser: HTML that prompts user to log-in, create account, or change password
function LoginUser(props) {
    return (
        <div className="login">
            {/* Login Row 0 - Username */}
            <div className="login_row">
                {/* Username Column 0 - Text */}
                <div className="login_info_column">
                    <p className="user"
                        data-testid="login_username_test">
                        Username:
                    </p>
                </div>
                {/* Username Column 1 - Input */}
                <div className="login_info_column">
                    <input
                        className="new_project_input"
                        id="user_login"
                        type="text"
                        placeholder="Enter Username" />
                </div>
            </div>
            {/* Login Row 1 - User ID */}
            <div className="login_row">
                {/* User ID Column 0 - Text */}
                <div className="login_info_column">
                    <p className="user"
                        data-testid="login_userid_test">
                        User ID:
                    </p>
                </div>
                {/* User ID Column 1 - Input */}
                <div className="login_info_column">
                    <input
                        className="new_project_input"
                        id="id_login"
                        type="text"
                        placeholder="Enter User ID" />
                </div>
            </div>
            {/* Login Row 2 - Password */}
            <div className="login_row">
                {/* Password Column 0 - Text */}
                <div className="login_info_column">
                    <p className="user"
                        data-testid="login_password_test">
                        Password:
                    </p>
                </div>
                {/* Password Column 1 - Input */}
                <div className="login_info_column">
                    <input
                        className="new_project_input"
                        id="password_login"
                        type="password"
                        placeholder="Enter Password" />
                    <br/>
                    <p className="show_pass">
                        <input
                            className="password_input"
                            data-testid="show_password_test"
                            type="checkbox"
                            onClick={props.onHidePasswordClick}/>
                        &nbsp;Show Password
                    </p>
                </div>
            </div>
            {/* Empty Space */}
            <div className="empty_space" />
            {/* Login Row 2 - Buttons */}
            <div className="login_row">
                {/* Button Column 0 - Login */}
                <div className="login_btns_column">
                    <button
                        className="login_btn"
                        id="login_btn"
                        type="button"
                        onClick={props.onLoginClick} >
                        Login
                    </button>
                </div>
                {/* Button Column 2 - Register */}
                <div className="login_btns_column">
                    <button
                        className="login_btn"
                        id="register_btn"
                        type="button"
                        onClick={props.onRegisterClick} >
                        Register
                    </button>
                </div>
                {/* Button Column 1 - Login */}
                <div className="login_btns_column">
                    <button
                        className="login_btn"
                        id="login_btn"
                        type="button"
                        onClick={props.onGuestClick} >
                        Login as Guest
                    </button>
                </div>
            </div>
        </div>
    )
}

export {Login, LoginUser};
