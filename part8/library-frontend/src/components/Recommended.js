import React from "react";

const Recommended = (props) => {
  const favorite = props.user.favoriteGenre;
  console.log(props.user);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommended for {props.user.username}</h2>
      <h2>Favourite Genre {props.user.favoriteGenre}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {props.books
            .filter((b) => b.genres.includes(favorite))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
