export default function Header(props) {
  return (
    <div>
      <nav className="fixed-navbar" style={{backgroundColor : props.color}}>
        <div className="logo">
          <a href="">LOGO</a>
        </div>
        <div className="menu">
          {props.links.map((link, index) => (
            <ul key={index}>
              <li>{link.home}</li>
              <li>{link.about}</li>
              <li>{link.blogs}</li>
              <li onClick={props.handelLogin}>
                {props.isLogged ? "Log out" : "Log in"}
              </li>
            </ul>
          ))}
        </div>
      </nav>
      <section className="title-section">
        <div className="title">
          <h1>You can see all blogs here and you can also write your own!</h1>
          <button className="btn-header">Write a Blog</button>
        </div>
      </section>
      <hr />
    </div>
  );
}
