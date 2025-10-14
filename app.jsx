
const {useState} = React;

/* SVG icons */
function CheckIcon({size=20}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CrossIcon({size=20}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Single Card component */
function Card({id, name, designation, active, disabledByGlobal, onToggleActive}) {
  return (
    <div className={`card ${active ? 'active' : 'inactive'}`} role="group" aria-roledescription="person card">
      <div className="avatar" aria-hidden>
        {/* avatar circle */}
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="7" r="3" stroke="#9ca3af" strokeWidth="1.4" />
          <path d="M4 20c1.6-4 7.4-4 8-4s6.4 0 8 4" stroke="#c7c9cf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className={`status-pill ${active ? 'active' : 'inactive'}`}>
        <span style={{width:10, height:10, borderRadius:6, background: active ? '#10b981' : '#9ca3af', display:'inline-block'}}></span>
        <strong>{active ? 'ACTIVE' : 'INACTIVE'}</strong>
      </div>

      <div className="name">{name}</div>
      <div className="designation">{designation}</div>

      <div className="status-icon" style={{color: active ? '#10b981' : '#ef4444'}}>
        {active ? <CheckIcon size={36}/> : <CrossIcon size={36}/>}
      </div>

      <button
        className={`card-button ${active ? 'enabled' : 'disabled'}`}
        disabled={!active}
        onClick={() => alert(`${name} — Clicked!`)}
        aria-disabled={!active}
        >
        Click Here
      </button>

      {/* small toggle for demonstration (disabled when Mark All Inactive is checked) */}
      <div style={{position:'absolute', top:12, right:12, fontSize:12, color:'#6b7280'}}>
        <label style={{display:'flex', alignItems:'center', gap:8}}>
          <input type="checkbox" checked={active} disabled={disabledByGlobal} onChange={() => onToggleActive(id)} />
          <span style={{fontSize:12}}>{disabledByGlobal ? 'locked' : 'toggle'}</span>
        </label>
      </div>
    </div>
  );
}

/* App root */
function App(){
  const initial = [
    {id:1, name:'John Doe', designation:'Developer', active:false},
    {id:2, name:'Priya Sharma', designation:'Product Designer', active:true},
    {id:3, name:'Karan Patel', designation:'QA Engineer', active:false},
  ];
  const [cards, setCards] = useState(initial);
  const [markAllInactive, setMarkAllInactive] = useState(false);

  function toggleCardActive(id){
    if(markAllInactive) return; // locked when global inactive is ON
    setCards(prev => prev.map(c => c.id === id ? {...c, active: !c.active} : c));
  }

  function setAllInactive(flag){
    setMarkAllInactive(flag);
    if(flag){
      // set all inactive
      setCards(prev => prev.map(c => ({...c, active:false})));
    }
    // if unchecked, we leave individual control to user (do not restore previous states)
  }

  return (
    <div className="container">
      <div className="controls">
        <label>
          <input type="checkbox" checked={markAllInactive} onChange={(e)=>setAllInactive(e.target.checked)} />
          <span style={{fontWeight:700}}>Mark All Inactive</span>
        </label>
        <div className="hint">When checked, all cards become inactive and individual toggles are locked.</div>
      </div>

      <div className="card-row" role="list">
        {cards.map(c => (
          <Card
            key={c.id}
            id={c.id}
            name={c.name}
            designation={c.designation}
            active={c.active}
            disabledByGlobal={markAllInactive}
            onToggleActive={toggleCardActive}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
