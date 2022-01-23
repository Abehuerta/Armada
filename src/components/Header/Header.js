import useSpacetraders from "../../hooks/useSpacetraders";

const Header = () => {

    const { 
        user,
        info,
        login,
        getUser,
        getStatus,
        getLeaderboard,
        getShips
    } = useSpacetraders();

    return (
        <div>
            <div>
                {user.name}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <button onClick={login}>Login</button>
                <button onClick={getUser}>Get game status</button>
                <button onClick={getStatus}>Get User Info</button>
                <button onClick={getLeaderboard}>Get Leaderboard Info</button>
                <button onClick={getShips}>Get your ships</button>
            </div>
            <div>
                {JSON.stringify(info)}
            </div>
        </div>
    );
}

export default Header;