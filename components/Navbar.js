const Navbar = ({ user }) => {
	return (
		<nav className="flex justify-between items-center py-4">
			<p className="text-2xl font-bold text-grey-800">My Todo's</p>
			{user && (
				<p className="text-2xl">
					Hello <b>{user.nickname}!</b>
				</p>
			)}
			<div className="flex">
				{user && (
					<a
						href="/api/logout"
						className="rounded bg-red-400 hover:bg-red-600 text-white py-2 px-4 cursor-pointer"
					>
						Logout
					</a>
				)}
				{!user && (
					<a
						href="/api/login"
						className="rounded bg-blue-600 hover:bg-blue-400 text-white py-2 px-4 cursor-pointer mr-4"
					>
						Login
					</a>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
