import Head from "next/head";
import { Component } from "react";

export default class Home extends Component {
	componentDidMount() {
		const BLOOD_TYPES = {
			"O−": ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"],
			"O+": ["O+", "A+", "B+", "AB+"],
			"A−": ["A−", "A+", "AB−", "AB+"],
			"A+": ["A+", "AB+"],
			"B−": ["B−", "B+", "AB−", "AB+"],
			"B+": ["B+", "AB+"],
			"AB−": ["AB−", "AB+"],
			"AB+": ["AB+"],
		};
		const selector = document.getElementById("blood_selector");
		const o_negative = document.querySelector(".o_negative");
		const blood_vias = document.querySelectorAll("#humans .human .blood_via");
		const blood_bag = document.querySelector("#blood_content > div.main_bag > div");
		const center_via = document.querySelector(".center_via > .blood_via");
		const blood_types = document.querySelectorAll(".blood_type");
		let lastCalled;
		addListeners();

		function callIfChildren(e) {
			if (lastCalled) change();
			if (e.target !== this) setRecipents(e);
		}

		function addListeners() {
			selector.addEventListener("click", callIfChildren);
		}

		function reset() {
			change();
			blood_bag.style.height = "100px";
			center_via.style.height = "0px";
		}

		function change() {
			lastCalled.target.classList.remove("highlight");

			for (let i = 0; i < blood_vias.length; i++) {
				blood_vias[i].style.width = "0px";
				blood_types[i].classList.remove("highlightText");
			}
		}

		function timeout(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}

		async function setRecipents(e) {
			e.target.classList.add("highlight");
			lastCalled = e;

			const donor = e.target.innerText;
			for (let item of BLOOD_TYPES[donor]) {
				const recipent_index = Object.keys(BLOOD_TYPES).indexOf(item);
				const height = 50 + 50 * Math.floor(recipent_index / 2);
				const blood_height = 125 - 25 * Math.floor(recipent_index / 2);
				blood_bag.style.height = `${blood_height}px`;
				center_via.style.height = `${height}px`;

				await timeout(100);
				blood_vias[recipent_index].style.width = "100%";
				blood_types[recipent_index].classList.add("highlightText");
			}
		}
		o_negative.click();
	}

	render() {
		return (
			<div>
				<Head>
					<title>Who Can Get My Blood | Romina Martín</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<div id="content">
						<h3>Donor's blood group:</h3>
						<div id="blood_selector">
							<div className="o_negative">O−</div>
							<div>O+</div>
							<div>A−</div>
							<div>A+</div>
							<div>B−</div>
							<div>B+</div>
							<div>AB−</div>
							<div>AB+</div>
						</div>
						<div id="blood_content">
							<div className="bar"></div>
							<div className="main_bag">
								<div className="blood"></div>
							</div>
						</div>
						<div id="center_via_c">
							<div className="center_via">
								<div className="blood_via"></div>
							</div>
						</div>
						<div id="humans">
							<div className="human left">
								<div className="scribble">
									<span className="blood_type">O−</span>
									<div className="head"></div>
									<div className="body"></div>
								</div>
								<div className="via"></div>
								<div className="blood_via"></div>
							</div>
							<div className="human right">
								<div className="scribble">
									<span className="blood_type">O+</span>
									<div className="head"></div>
									<div className="body"></div>
								</div>
								<div className="via"></div>
								<div className="blood_via"></div>
							</div>
							<div className="human left">
								<div className="scribble">
									<span className="blood_type">A−</span>
									<div className="head"></div>
									<div className="body"></div>
								</div>
								<div className="via"></div>
								<div className="blood_via"></div>
							</div>
							<div className="human right">
								<div className="scribble">
									<span className="blood_type">A+</span>
									<div className="head"></div>
									<div className="body"></div>
								</div>
								<div className="via"></div>
								<div className="blood_via"></div>
							</div>
							<div className="human left">
								<div className="scribble">
									<span className="blood_type">B−</span>
									<div className="head"></div>
									<div className="body"></div>
								</div>
								<div className="via"></div>
								<div className="blood_via"></div>
							</div>
							<div className="human right">
								<div className="scribble">
									<span className="blood_type">B+</span>
									<div className="head"></div>
									<div className="body"></div>
								</div>
								<div className="via"></div>
								<div className="blood_via"></div>
							</div>
							<div className="human left">
								<div className="scribble">
									<span className="blood_type">AB−</span>
									<div className="head"></div>
									<div className="body"></div>
								</div>
								<div className="via"></div>
								<div className="blood_via"></div>
							</div>
							<div className="human right">
								<div className="scribble">
									<span className="blood_type">AB+</span>
									<div className="head"></div>
									<div className="body"></div>
								</div>
								<div className="via"></div>
								<div className="blood_via"></div>
							</div>
						</div>
					</div>
				</main>
				<footer>
					Original Work: <a href="https://codepen.io/RominaMartin/full/OJVdvRm">Romina Martín's Codepen</a>
				</footer>
			</div>
		);
	}
}
