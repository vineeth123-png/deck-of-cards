import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";
import axios from "axios";
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";
class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: null,
			drawn: []
		};
		this.getCard = this.getCard.bind(this);
	}
	async componentDidMount() {
		let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
		this.setState({ deck: deck.data });
	}
	async getCard() {
		let { deck_id } = this.state.deck;
		let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
		try {
			let cardRes = await axios.get(cardUrl);
			if (!cardRes.data.success) throw new Error("No cards remaining!");
			let card = cardRes.data.cards[0];
			console.log(card);
			this.setState((st) => ({
				drawn: [
					...st.drawn,
					{
						id: card.code,
						image: card.image,
						name: `${card.suit} ${card.code}`
					}
				]
			}));
		} catch (err) {
			alert(err);
		}
	}
	render() {
		const cards = this.state.drawn.map((card) => (
			<Card key={card.id} name={card.name} image={card.image} />
		));
		return (
			<div className="Deck">
				<h1 className="Deck-title">♦ Card Dealer ♦</h1>
				<h2 className="Deck-title subtitle">♦ Demo made using React ♦</h2>
				<button className="Deck-btn" onClick={this.getCard}>
					Get a Card
				</button>
				<div className="Deck-cardarea">{cards}</div>
			</div>
		);
	}
}

export default Deck;
