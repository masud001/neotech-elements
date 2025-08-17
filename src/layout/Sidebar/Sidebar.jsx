import { useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/SidebarContext';

const Sidebar = () => {
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass(''); // No class when sidebar is open (visible)
    } else {
      setSidebarClass('sidebar-change'); // Add sidebar-change class when sidebar is closed (hidden)
    }
  }, [isSidebarOpen]);

  // Function to get descriptive alt text for each navigation icon
  const getIconAltText = (title, id) => {
    const altTexts = {
      1: 'House icon for home page',
      2: 'Checkmark icon for chemical management',
      3: 'Document icon for reports section',
      4: 'Wallet icon for SDS documents',
      5: 'Paper plane icon for incident reports',
      6: 'Analytics chart icon for data analysis',
      7: 'Growth chart icon for training materials',
      8: 'User profile icon for user management',
      9: 'Gear icon for system settings'
    };
    return altTexts[id] || `${title} section icon`;
  };

  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
          <div className="info-img img-fit-cover">
              <img src={ personsImgs.person_two } alt="User profile photo" />
          </div>
          <span className="info-name">alice-doe</span>
      </div>

      <nav className="navigation">
          <ul className="nav-list">
            {
              navigationLinks.map((navigationLink) => (
                <li className="nav-item" key = { navigationLink.id }>
                  <a href="#" className={ `nav-link ${ navigationLink.id === activeLinkIdx ? 'active' : null }` }>
                      <img 
                        src={ navigationLink.image } 
                        className="nav-link-icon" 
                        alt={ getIconAltText(navigationLink.title, navigationLink.id) }
                        aria-hidden="false"
                      />
                      <span className="nav-link-text">{ navigationLink.title }</span>
                  </a>
                </li>
              ))
            }
          </ul>
      </nav>
    </div>
  )
}

export default Sidebar
