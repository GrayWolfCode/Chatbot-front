import {
  faEdit,
  faHome,
  faMagic,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar({setUpdateMode}) {
  const navigate = useNavigate();
  return (
    <div className="fixed flex top-0 left-0 h-full w-56 py-4 bg-[#D9D7D4] text-gray-700  flex-col justify-between">
      <div className="flex flex-col flex-1 h-0">
        <div className="pl-2 text-left">
          <h1 className="my-4 pl-4 text-[26px] font-bold trans hover:text-[#1fb8cd] hover:cursor-pointer">
            <FontAwesomeIcon icon={faMagic} />
            &nbsp;Horizons
          </h1>
          <div
            className={`sidebar-link trans`}
            onClick={() => setUpdateMode(0)}
          >
            <FontAwesomeIcon icon={faHome} />
            &nbsp; Home
          </div>
          <div
            className={`sidebar-link trans`}
            onClick={() => setUpdateMode(1)}
          >
            <FontAwesomeIcon icon={faEdit} />
            &nbsp; Upload
          </div>
          
        </div>
      </div>
    </div>
  );
}
