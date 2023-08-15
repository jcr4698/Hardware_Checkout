import React from 'react';
import './Projects.css';

/* Library Indices */

const IDX = 0;
const PROJ_NAME = 1;
const PROJ_ID = 2;
const DESC = 3;
const USERS = 4;
const HW_SELECT = 5;
const HW_LIST = 6;

/* HW Indices */

const HW_VAL = 0;
const HW_CAP = 1;

/* Components */

// Project: Displays the structure of the list of projects
class Projects extends React.Component {
	render() {
		return (
			<div>
				<LogoutUser
					onLogoutClick={() => this.handleLogout()}
				/>
				<div className="project_wrap">
					<p className="project_title"
						data-testid="page-title">
						{this.props.curr_user}'s Projects
					</p>
					<ProjectData
						curr_user={this.props.curr_user}
						curr_id={this.props.curr_id}
					/>
					<div className="empty_space" />
				</div>
			</div>

		)
	}

	/* Handlers */

	// handleLogin: Determine whether a valid account is entered
    handleLogout() {
		this.props.handleLogoutStatus();
	}

}

// Place data into a stored list
class ProjectData extends React.Component {

	// constructor: Store data into the state
	constructor(props) {

		/* Current state of the library */
		super(props);
		this.state = {
			/* User Information */
			curr_user: this.props.curr_user,
			curr_id: this.props.curr_id,
			curr_hw1: [180, 180],
			curr_hw2: [180, 180],
			project_list: [[0, "Project 1", "proj0", "Example Project 1 for demo", ["you", "jcr4698"], 1, [[100, 100], [100, 100]]],
						   [1, "Project 2", "proj1", "Example Project 2 for demo", ["you", "abc123"], 1, [[100, 100], [100, 100]]]],
			proj_desc: ""
		};

	}

	// componentDidMount: Initialize data from server into library
	componentDidMount() {
		this.handleRefresh();
	}

	// render: Update page with the data stored
	render() {
		/* Create html list */
		const new_project_list = [];

		/* Get data from library */
		const project_list = this.state.project_list.slice();

		/* Push data as formatted project to html list */
		for(let i = 0; i < project_list.length; i++) {
			/* Get next project (data) */
			const project_data = project_list[i];

			/* Project in HTML format for library */
			new_project_list.push(
				this.renderProject(project_data[IDX], project_data[PROJ_NAME], project_data[USERS], project_data[HW_LIST])
			);
		}

		/* output the fully formatted project library */
		return (
			<div>
				<RefreshUser
					onRefreshClick={() => this.handleRefresh()}
				/>
				{this.renderHWSets(this.state.curr_hw1, this.state.curr_hw2)}
				<div className="empty_space" />
				{new_project_list}
				<div className="empty_space" />
				{this.renderNewProject()}
				<div className="empty_space" />
				{this.renderJoinProject()}
				<div className="empty_space" />
			</div>
		)
	}

	/* functions */

	// renderHWSets: Format the hardware sets available and the capacity
	renderHWSets(hw1, hw2) {
		return (
			<div>
				<div className="hardware_sets">
					<div className="hw_column">
						<p className="hw_description"
							data-testid="hw1_test">
							HWSet1:
						</p>
						<p className="hw_description">
							{hw1[HW_VAL]}/{hw1[HW_CAP]}
						</p>
					</div>
				</div>
				<div className="hardware_sets">
					<div className="hw_column">
						<p className="hw_description"
							data-testid="hw2_test">
							HWSet2:
						</p>
						<p className="hw_description">
							{hw2[HW_VAL]}/{hw2[HW_CAP]}
						</p>
					</div>
				</div>
			</div>
		)
	}

	// renderProject: Create a single formatted project with given data
	renderProject(i, proj, usr, hw) {
		return (
			<Project
				key={i.toString()}  // "key" is recommended by console (don't use it much in project tho)
				idx={i}
				Name={proj}
				Users={usr}
				HW={hw}
				onMoreInfoClick={() => this.handleMoreInfo(i)}
				onCheckInClick={() => this.handleCheckIn(i)}
				onCheckOutClick={() => this.handleCheckOut(i)}
				onHWSelection={() => this.handleHWSelection(i)}
				onProjectLeave={() => this.handleProjectLeave(i)} />
		)
	}

	// renderNewProject: Create template that prompts user to make new project
	renderNewProject() {
		return (
			<ProjectAdder onNewProjectClick={() => this.handleNewProject()} />
		)
	}

	// renderJoinProject: Create template that prompts user for project id to join
	renderJoinProject() {
		return (
			<ProjectJoiner onProjectJoinClick={() => this.handleProjectJoin()} />
		)
	}

	/* Handlers */

	// handleRefresh: Update the projects in the project library
	handleRefresh() {
		/* list format to be stored */
		// const proj_list = [[0, "Project 1", "proj0", "Example Project 1 for demo", ["you", "jcr4698"], 1, [[100, 100], [100, 100]]],
		// 				   [1, "Project 2", "proj1", "Example Project 2 for demo", ["you", "abc123"], 1, [[100, 100], [100, 100]]]];

		/* Get hw sets */
		// const hw_set_1 = 180;
		// const hw_set_2 = 180;

		/* Set state of frontend */
		this.setState({
			project_list: this.state.project_list,
			curr_hw1: this.state.curr_hw1,
			curr_hw2: this.state.curr_hw2
		});
	}

	// handleHWSelection: Alert the description of the project chosen
	handleMoreInfo(i) {
		/* Obtain data fetched from route into library */
		alert("PROJECT DESCRIPTION: " + this.state.project_list[i][DESC]);
		this.setState({
			proj_desc: "example description of current project."
		})
	}

	// handleHWSelection: Update hw selection value when selection has changed
	handleHWSelection(i) {
		/* Get and modify the hw selection index */
		const project_list = this.state.project_list.slice();

		var curr_hw_selection = parseInt(document.getElementById("hw_set:" + project_list[i][PROJ_NAME]).value);
		project_list[i][HW_SELECT] = curr_hw_selection;

		/* Set the hw selection index to state */
		this.setState({
			project_list: project_list
		})
	}

	// handleCheckIn: Add and display new values to interface
	handleCheckIn(i) {
		/* Get current list and hw selection index */
		const project_list = this.state.project_list.slice();

		/* Get input value (chk-in value) and make sure it's not empty */
		const check_in_val = document.getElementById("check_in:" + project_list[i][PROJ_NAME]).value;
		if(check_in_val !== "" && !isNaN(check_in_val)) {

			/* Get current value and capacity of hw selection */
			const proj_hw_idx = project_list[i][HW_SELECT];

			/* Get hw sets */
			var hw_set_1 = this.state.curr_hw1;
			var hw_set_2 = this.state.curr_hw2;

			if((proj_hw_idx === 1) && (hw_set_1[HW_VAL] + +check_in_val < hw_set_1[HW_CAP])) {
				hw_set_1[HW_VAL] += +check_in_val;
			}
			if((proj_hw_idx === 2) && (hw_set_2[HW_VAL] + +check_in_val < hw_set_2[HW_CAP])) {
				hw_set_2[HW_VAL] += +check_in_val;
			}

			/* Set state of frontend */
			this.setState({
				curr_hw1: hw_set_1,
				curr_hw2: hw_set_2
			});

			document.getElementById("check_in:" + project_list[i][PROJ_NAME]).value = "";

		}
	}

	// handleCheckOut: Subtract and display new values to interface
	handleCheckOut(i) {
		/* Access current list and hw selection index */
		const project_list = this.state.project_list.slice();

		/* Make sure field is not empty */
		const check_out_val = document.getElementById("check_out:" + project_list[i][PROJ_NAME]).value;
		if(check_out_val !== "" && !isNaN(check_out_val)) {

			/* Get current value and capacity of hw selection */
			const proj_hw_idx = project_list[i][HW_SELECT];

			/* Get hw sets */
			var hw_set_1 = this.state.curr_hw1;
			var hw_set_2 = this.state.curr_hw2;

			if((proj_hw_idx === 1) && (hw_set_1[HW_VAL] - +check_out_val >= 0)) {
				hw_set_1[HW_VAL] -= +check_out_val;
			}
			if((proj_hw_idx === 2) && (hw_set_2[HW_VAL] - +check_out_val >= 0)) {
				hw_set_2[HW_VAL] -= +check_out_val;
			}

			/* Set state of frontend */
			this.setState({
				curr_hw1: hw_set_1,
				curr_hw2: hw_set_2
			});

			document.getElementById("check_out:" + project_list[i][PROJ_NAME]).value = "";

		}
	}

	// handleNewProject: Add new HWSet to The data of the library
	handleNewProject() {
		/* Get the new project info and make sure they are non-empty strings */
		const project_name = document.getElementById("new_project_name").value;
		const project_id = document.getElementById("new_project_id").value;
		const project_desc = document.getElementById("new_project_description").value;
		if(typeof project_name === 'string' && typeof project_id === 'string') {
			if(project_name.trim() !== '' && project_id.trim() !== '') {

				/* Get state push the new data into it */
				const project_list = this.state.project_list.slice();
				const user_list = [];
				user_list.push(this.state.curr_id);

				/* Add additional users */
				const list_input = document.getElementById("new_project_users").value;
				if(typeof list_input == 'string' && list_input.trim() !== '') {
					const users_arr = list_input.split(",").map(String);
					for(let i = 0; i < users_arr.length; i++) {
						const auth_user = users_arr[i].trim();
						if(auth_user !== '') {
							user_list.push(auth_user);
						}
					}
				}

				project_list.push([project_list.length, project_name, project_id, project_desc, user_list, 1, [[100, 100], [100, 100]]]);

				/* Set list with additional project data to state */
				this.setState({
					project_list: project_list
				})

				/* Clear input text fields */
				document.getElementById("new_project_name").value = "";
				document.getElementById("new_project_id").value = "";
				document.getElementById("new_project_description").value = "";
				document.getElementById("new_project_users").value = "";
			}
		}
	}

	// handleProjectJoin: Search for project in database and join if possible
	handleProjectJoin() {
		/* Get the new project info and make sure they are non-empty strings */
		const project_id = document.getElementById("existing_project_id").value;

		if(typeof project_id === 'string' && project_id.trim() !== '') {

			const project_list = this.state.project_list.slice();

			project_list.push([
									project_list.length,
									"Project " + (project_list.length + 1),
									"example_1",
									"Pre-existing Project " + (project_list.length + 1),
									["you"],
									1
								]);

			/* Set list with additional project data to state */
			this.setState({
				project_list: project_list
			})

			/* Clear input text fields */
			document.getElementById("existing_project_id").value = "";
		}

	}

	handleProjectLeave(i) {
		/* list format to be stored */
		// const proj_list = [];

		/* Get current list and hw selection index */
		const project_list = this.state.project_list.slice();
		project_list.splice(i, 1);

		console.log(project_list);

		/* Set state of frontend */
		this.setState({
			project_list: project_list,
			// curr_hw1: hw_set_1,
			// curr_hw2: hw_set_2
		});
	}

}

/* HTML */

// LogoutUser: HTML that prompts user to log-out
function LogoutUser(props) {
	return (
		<button
			className="logout_btn"
			type="button"
			onClick={props.onLogoutClick} >
			logout
		</button>
	)
}

// RefreshUser: HTML that prompts user to refresh
function RefreshUser(props) {
	return (
		<button
			className="refresh_btn"
			type="button"
			onClick={props.onRefreshClick} >
			refresh
		</button>
	)
}

// Project: HTML that formats a single Project
function Project(props) {
	return (
		<div className="project">
			{/* Title */}
			<div className="project_column">
				<p className="project_name">
					{props.Name}
				</p>
			</div>
			{/* Users with Access */}
			<div className="project_column">
				<div className="registered_user_list">
					{Registered_Users(props.Users)}
				</div>
			</div>
			{/* Select HW */}
			<div className="project_column">
				<p className="hw_description">
					Select HWSet:
				</p>
				<select
					className="hw_select"
					id={"hw_set:" + props.Name}
					name="hwset"
					onChange={props.onHWSelection} >
					<option value="1">
						HWSet 1
					</option>
					<option value="2">
						HWSet 2
					</option>
				</select>
			</div>
			{/* Check In */}
			<div className="project_column">
				<input className="hw_input"
					id={"check_in:" + props.Name}
					type="text"
					placeholder="Enter Value" />
				<button className="check_btn"
					type="button"
					onClick={props.onCheckInClick} >
					Check In
				</button>
			</div>
			{/* Check Out */}
			<div className="project_column">
				<input className="hw_input"
					id={"check_out:" + props.Name}
					type="text"
					placeholder="Enter Value" />
				<button className="check_btn"
					type="button"
					onClick={props.onCheckOutClick} >
					Check Out
				</button>
			</div>
			{/* Project Description */}
			<div className="project_column">
				<button className="join_btn"
					type="button"
					onClick={props.onMoreInfoClick} >
					More Info
				</button>
			</div>
			{/* Join or Leave */}
			<div className="project_column">
				<button className="join_btn"
					id={"leave:" + props.Name}
					type="button"
					onClick={props.onProjectLeave}>
					Leave
				</button>
			</div>
		</div>
	)
}

// Registered_Users: Creates user list to HTML (Project helper function)
function Registered_Users(users) {
	/* Make HTML format for users */
	const curr_user_list = []

	/* Push data as formatted project to html list */
	for(let i = 0; i < users.length; i++) {
		curr_user_list.push(
			<p className="registered_user" key={i}>
				{users[i]}
			</p>
		)
	}

	/* Return the HTML format */
	return curr_user_list;
}

// ProjectAdder: HTML that gives the user the option to add a project to the library
function ProjectAdder(props) {
	return (
		<div className="new_project">
			{/* Title */}
			<div className="new_project_column">
				<input className="new_project_input"
					id="new_project_name"
					type="text"
					placeholder="Enter Project Name" />
			</div>
			{/* Users with Access */}
			<div className="new_project_column">
				<input className="new_project_input"
					id="new_project_id"
					type="text"
					placeholder="Enter Project ID" />
			</div>
			{/* Add Project */}
			<div className="new_project_column">
				<button className="add_project_btn"
					type="button"
					onClick={props.onNewProjectClick} >
					Add Project
				</button>
			</div>
			{/* Users */}
			<div className="new_project_description">
				<input className="project_description"
					data-testid="new_proj_desc"
					id="new_project_users"
					type="text"
					placeholder="Enter Authorized Users (Separated by a comma)" />
			</div>
			{/* Description */}
			<div className="new_project_description">
				<input className="project_description"
					id="new_project_description"
					type="text"
					placeholder="Enter Project Description" />
			</div>
		</div>
	)
}

function ProjectJoiner(props) {
	return (
		<div className="project">
			{/* Title */}
			<div className="join_project_column">
				<p className="add_project_title"
					data-testid="join_project_test">
					Join Existing Project:
				</p>
			</div>
			{/* Users with Access */}
			<div className="join_project_column">
				<input className="new_project_input"
					id="existing_project_id"
					type="text"
					placeholder="Project ID" />
			</div>
			{/* Join or Leave */}
			<div className="join_project_column">
				<button
					className="join_project_btn"
					type="button"
					onClick={props.onProjectJoinClick} >
					Join
				</button>
			</div>
		</div>
	)
}

export {Projects};
