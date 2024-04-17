import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";

export default function UserList() {
	const { users, dispatch } = useContext(UserContext);

	useEffect(() => {
		getUsers(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		deleteUser(id, dispatch);
	};

	const columns = [
		{ field: "_id", headerName: "ID", width: 90 },
		{
			field: "username",
			headerName: "Username",
			width: 200,
			renderCell: (params) => {
				return <div className="userListUser">{params.row.username}</div>;
			},
		},
		{ field: "email", headerName: "Email", width: 200 },
		//{ field: "isAdmin", headerName: "Admin", width: 120 },
		{ field: "createdAt", headerName: "Created At", width: 160 },
		{ field: "updatedAt", headerName: "Updated At", width: 160 },
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						{/* <Link to={"/user/" + params.row._id}>
							<button className="userListEdit">Edit</button>
						</Link> */}
						<DeleteOutline
							className="userListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className="userList">
			<DataGrid
				rows={users}
				disableSelectionOnClick
				columns={columns}
				pageSize={15}
				checkboxSelection
				getRowId={(r) => r._id}
			/>
		</div>
	);
}
