import { useNavigate } from "react-router-dom";

import {
	BackgroundImage,
	Body,
	DirectoryContainer
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
	const { imageUrl, title, route } = category; // destructure
	const navigate = useNavigate();

	const onNavigate = () => navigate(route)

	return (
		<DirectoryContainer onClick={onNavigate}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryContainer>
	);
};

export default DirectoryItem;
