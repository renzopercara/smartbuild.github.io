import { h, render } from "https://esm.sh/preact";
import { useState } from "https://esm.sh/preact/hooks";

const projects = [
  { name: "Ampliación Dalias/Lirios", path: "dalias-lirios" },
  { name: "Garage Dalias/Lirios", path: "dalias-lirios-garage" },
];

function ProjectList() {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return h(
    "div",
    { class: "container", style: "max-width: 600px; margin-top: 30px;" },
    h(
      "div",
      { class: "card-panel z-depth-3", style: "border-radius: 15px; padding: 20px;" },
      h("h4", { class: "center-align blue-text text-darken-2" }, "Listado de Proyectos"),

      // Input de búsqueda con icono de lupa
      h(
        "div",
        { class: "input-field", style: "position: relative;" },
        h("input", {
          type: "text",
          id: "search",
          class: "validate",
          placeholder: "Buscar proyecto...",
          onInput: (e) => setSearch(e.target.value),
        }),
        h(
          "i",
          {
            class: "material-icons",
            style: `
              position: absolute;
              right: 10px;
              top: 10px;
              color: #1976D2;
              cursor: pointer;
            `,
          },
          "search"
        )
      ),

      // Lista de proyectos estilizada
      h(
        "ul",
        { class: "collection", style: "border-radius: 10px; overflow: hidden;" },
        filteredProjects.length > 0
          ? filteredProjects.map((project) =>
              h(
                "a",
                {
                  href: project.path,
                  class: "collection-item",
                  style: `
                    display: flex; 
                    align-items: center; 
                    padding: 15px; 
                    text-decoration: none; 
                    color: inherit;
                    transition: background 0.3s;
                  `,
                  onMouseOver: (e) => (e.currentTarget.style.background = "#E3F2FD"),
                  onMouseOut: (e) => (e.currentTarget.style.background = "white"),
                },
                h("i", { class: "material-icons", style: "color: #1976D2; margin-right: 15px;" }, "folder"),
                h(
                  "span",
                  { class: "title", style: "flex-grow: 1; font-weight: bold; font-size: 18px;" },
                  project.name
                ),
                h("i", { class: "material-icons", style: "color: #1976D2; font-size: 20px;" }, "arrow_forward")
              )
            )
          : h(
              "li",
              { class: "collection-item center-align grey-text", style: "padding: 15px;" },
              "No se encontraron proyectos"
            )
      )
    )
  );
}

render(h(ProjectList), document.getElementById("app"));
