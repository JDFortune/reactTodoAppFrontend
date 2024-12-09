const Header: React.FC<{title: string, todoCount: number}> = ({title, todoCount}) => {

  return (
    <header>
      <label htmlFor="sidebar_toggle">
        <img src="images/hamburger.png" alt="Toggle Sidebar" />
      </label>
      <dl>
        <dt><time>{title}</time></dt><dd>{todoCount}</dd>
      </dl>
    </header>
  )
}

export default Header