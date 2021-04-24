const MapSelect = (props) => {

    let maps = [];
    const [activeMap, setActiveMap] = useState({});
    const [showDeleteMap, toggleShowDeleteMap] = useState(false);


    const refetchMaps = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			maps = data.getAllTodos;
			if (activeList._id) {
				let tempID = activeList._id;
				let list = todolists.find(list => list._id === tempID);
				setActiveList(list);
			}
		}
	}
}