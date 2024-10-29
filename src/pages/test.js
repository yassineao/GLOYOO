import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/graph.css"
const employeeData = [
  {
    id: 1,
    name: 'Esther Howard',
    position: "Sale's manager USA",
    transactions: 3490,
    rise: true,
    tasksCompleted: 3,
    imgId: 0,
  },
  {
    id: 2,
    name: 'Eleanor Pena',
    position: "Sale's manager Europe",
    transactions: 590,
    rise: false,
    tasksCompleted: 5,
    imgId: 2,
  },
  {
    id: 3,
    name: 'Robert Fox',
    position: "Sale's manager Asia",
    transactions: 2600,
    rise: true,
    tasksCompleted: 1,
    imgId: 3,
  },
];

const Countrydata = [
  { name: 'USA', rise: true, value: 21942.83, id: 1 },
  { name: 'Ireland', rise: false, value: 19710.0, id: 2 },
  { name: 'Ukraine', rise: false, value: 12320.3, id: 3 },
  { name: 'Sweden', rise: true, value: 9725.0, id: 4 },
];

const segmentationData = [
  { c1: 'Not Specified', c2: '800', color: '#535353' },
  { c1: 'Male', c2: '441', color: '#595f77' },
  { c1: 'Female', c2: '233', color: '#232942' },
  { c1: 'Other', c2: '126', color: '#2c3051' },
];

const sidebarItems = [
  [
    { id: '0', title: 'Dashboard', notifications: false },
    { id: '1', title: 'Overview', notifications: false },
    { id: '2', title: 'Chat', notifications: 6 },
    { id: '3', title: 'Team', notifications: false },
  ],
  [
    { id: '4', title: 'Tasks', notifications: false },
    { id: '5', title: 'Reports', notifications: false },
    { id: '6', title: 'Settings', notifications: false },
  ],
];

const graphData = [
  'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July',
].map((i) => ({
  name: i,
  revenue: 500 + Math.random() * 2000,
  expectedRevenue: Math.max(700 + Math.random() * 2000, 0),
  sales: Math.floor(Math.random() * 500),
}));

const App = () => {
  const [showSidebar, onSetShowSidebar] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        onSidebarHide={() => onSetShowSidebar(false)}
        showSidebar={showSidebar}
      />
      <Content onSidebarHide={() => onSetShowSidebar(true)} />
    </div>
  );
};

function Sidebar({ onSidebarHide, showSidebar }) {
  const [selected, setSelected] = useState('0');
  
  return (
    <div
      className={clsx(
        'fixed inset-y-0 left-0 bg-card w-full sm:w-20 xl:w-60 sm:flex flex-col z-10',
        showSidebar ? 'flex' : 'hidden'
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
          <IconButton icon="res-react-dash-logo" className="w-10 h-10" />
          <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-white">React</div>
          <IconButton
            icon="res-react-dash-sidebar-close"
            className="block sm:hidden"
            onClick={onSidebarHide}
          />
        </div>
      </div>
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        <div className="w-full p-3 h-24 sm:h-20 xl:h-24 hidden sm:block flex-shrink-0">
          <div className="bg-sidebar-card-top rounded-xl w-full h-full flex items-center justify-start sm:justify-center xl:justify-start px-3 sm:px-0 xl:px-3">
            <Icon path="res-react-dash-sidebar-card" className="w-9 h-9" />
            <div className="block sm:hidden xl:block ml-3">
              <div className="text-sm font-bold text-white">Sales House</div>
              <div className="text-sm">General Item</div>
            </div>
          </div>
        </div>
        {sidebarItems[0].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            onClick={setSelected}
            selected={selected}
          />
        ))}
        <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">SHORTCUTS</div>
        {sidebarItems[1].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            onClick={setSelected}
            selected={selected}
          />
        ))}
      </div>
    </div>
  );
}

function MenuItem({ item: { id, title, notifications }, onClick, selected }) {
  return (
    <div
      className={clsx(
        'w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start cursor-pointer',
        selected === id ? 'sidebar-item-selected' : 'sidebar-item'
      )}
      onClick={() => onClick(id)}
    >
      <SidebarIcons id={id} />
      <div className="block sm:hidden xl:block ml-2">{title}</div>
      {notifications && (
        <div className="flex sm:hidden xl:flex bg-pink-600 w-5 h-5 flex items-center justify-center rounded-full mr-2">
          <div className="text-white text-sm">{notifications}</div>
        </div>
      )}
    </div>
  );
}

function Content() {
  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">.</div>
      <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <Graph />
      </div>
    </div>
  );
}

function Graph() {
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">Your Work Summary</div>
        </div>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <CartesianGrid horizontal={false} strokeWidth="6" stroke="#252525" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip cursor={false} />
            <Line type="monotone" dataKey="revenue" stroke="#6B8DE3" strokeWidth="4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Icon({ path = 'options', className = 'w-4 h-4' }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.svg`}
      alt=""
      className={clsx(className)}
    />
  );
}

function IconButton({ onClick = () => {}, icon = 'options', className = 'w-4 h-4' }) {
  return (
    <button onClick={onClick} type="button" className={className}>
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="w-full h-full"
      />
    </button>
  );
}

function SidebarIcons({ id }) {
  const icons = {
    0: (<path d="M12 19C10.067 19 8.31704..." />),
    1: (<path fillRule="evenodd" clipRule="evenodd" d="M3 5C3 3.34315 4..." />),
    2: (<path d="M2 4V18L6.8 14.4..." />),
    // add rest of the SVG paths here
  };
  return (
    <svg className="w-8 h-8 xl:w-5 xl:h-5" viewBox="0 0 24 24" fill="currentColor">
      {icons[id]}
    </svg>
  );
}

export default App;
