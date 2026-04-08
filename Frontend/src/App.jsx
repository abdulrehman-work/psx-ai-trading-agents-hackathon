import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Target, Shield, Server, Box, TerminalSquare, Search, Bell, History } from 'lucide-react';

const mockData = [
  { time: '10:00', price: 310.2 },
  { time: '10:30', price: 311.5 },
  { time: '11:00', price: 309.8 },
  { time: '11:30', price: 312.4 },
  { time: '12:00', price: 315.0 },
  { time: '12:30', price: 314.2 },
  { time: '13:00', price: 316.5 },
];

const decisionStream = [
  { agent: 'Analyst', type: 'signal', text: 'Detected bullish crossover on ENGRO 15m chart.', time: 'Just now' },
  { agent: 'News', type: 'info', text: 'Dawn News: FBR announces corporate tax rebate for energy sector.', time: '2m ago' },
  { agent: 'Risk', type: 'warning', text: 'Volatility spike detected. Suggested stop-loss tightened to Rs. 295.', time: '5m ago' },
  { agent: 'Portfolio', type: 'action', text: 'Buy 1,200 shares of ENGRO at ≤ Rs. 312 | Target Rs. 348 | Stop-loss Rs. 295 | Confidence 82%', time: '7m ago', highlight: true }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stream, setStream] = useState(decisionStream);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStream(prev => {
        const newMsg = { agent: 'News', type: 'info', text: 'Scanning external sources (Business Recorder, Twitter) for macro signals...', time: 'Just now' };
        return [newMsg, ...prev.slice(0, 4)];
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'agents':
        return (
          <div className="grid-dashboard animate-fade-in">
            <div className="glass-panel col-span-12">
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '20px' }}>Agent Swarm Network</h3>
              <div className="grid-dashboard">
                <div className="col-span-6 glass-panel" style={{ background: 'var(--bg-dark)' }}>
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="flex items-center" style={{gap:'8px'}}><TrendingUp className="text-positive"/> Market Analyst Agent</h4>
                      <span className="badge badge-positive">Active</span>
                   </div>
                   <p className="text-muted" style={{fontSize: '0.9rem', marginBottom: '12px'}}>Continuously analyzing PSX historical data, moving averages, and order book depth.</p>
                   <div className="flex justify-between text-muted" style={{fontSize: '0.8rem'}}>
                      <span>Ping: 12ms</span>
                      <span>Last Target: ENGRO Analysis</span>
                   </div>
                </div>
                <div className="col-span-6 glass-panel" style={{ background: 'var(--bg-dark)' }}>
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="flex items-center" style={{gap:'8px'}}><Box style={{ color: 'var(--accent)' }}/> News & Sentiment Agent</h4>
                      <span className="badge badge-positive">Active</span>
                   </div>
                   <p className="text-muted" style={{fontSize: '0.9rem', marginBottom: '12px'}}>Scraping DAWN, Business Recorder, and Twitter APIs for macro-economic indicators.</p>
                   <div className="flex justify-between text-muted" style={{fontSize: '0.8rem'}}>
                      <span>Ping: 24ms</span>
                      <span>Last Target: FBR Tax Update</span>
                   </div>
                </div>
                <div className="col-span-6 glass-panel" style={{ background: 'var(--bg-dark)' }}>
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="flex items-center" style={{gap:'8px'}}><Shield className="text-warning"/> Risk Management Agent</h4>
                      <span className="badge badge-positive">Active</span>
                   </div>
                   <p className="text-muted" style={{fontSize: '0.9rem', marginBottom: '12px'}}>Monitoring portfolio beta, adjusting exposure rules via smart-contract constraints.</p>
                   <div className="flex justify-between text-muted" style={{fontSize: '0.8rem'}}>
                      <span>Ping: 8ms</span>
                      <span>Last Action: SL TIGHTEN</span>
                   </div>
                </div>
                <div className="col-span-6 glass-panel" style={{ background: 'var(--bg-dark)' }}>
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="flex items-center" style={{gap:'8px'}}><Target className="text-main"/> Portfolio Orchestrator</h4>
                      <span className="badge badge-warning">Awaiting Sync</span>
                   </div>
                   <p className="text-muted" style={{fontSize: '0.9rem', marginBottom: '12px'}}>Combines signals to approve Kraken EIP-712 formatted proxy trades securely.</p>
                   <div className="flex justify-between text-muted" style={{fontSize: '0.8rem'}}>
                      <span>Ping: 45ms</span>
                      <span>Last Action: APPROVE EXECUTION</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'portfolio':
        return (
          <div className="grid-dashboard animate-fade-in">
            <div className="glass-panel col-span-12">
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '20px' }}>Simulated Assets (Paper Trading)</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px 8px' }}>Asset</th>
                      <th style={{ padding: '12px 8px' }}>Type</th>
                      <th style={{ padding: '12px 8px' }}>Holding</th>
                      <th style={{ padding: '12px 8px' }}>Avg Entry</th>
                      <th style={{ padding: '12px 8px' }}>Current Price</th>
                      <th style={{ padding: '12px 8px' }}>PnL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 600 }}>ENGRO (PSX)</td>
                      <td style={{ padding: '16px 8px' }}><span className="badge badge-brand">Equity</span></td>
                      <td style={{ padding: '16px 8px' }}>1,200</td>
                      <td style={{ padding: '16px 8px' }}>Rs. 301.50</td>
                      <td style={{ padding: '16px 8px' }}>Rs. 316.50</td>
                      <td style={{ padding: '16px 8px' }} className="text-positive">+Rs. 18,000</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 600 }}>SYS (PSX)</td>
                      <td style={{ padding: '16px 8px' }}><span className="badge badge-brand">Equity</span></td>
                      <td style={{ padding: '16px 8px' }}>450</td>
                      <td style={{ padding: '16px 8px' }}>Rs. 420.00</td>
                      <td style={{ padding: '16px 8px' }}>Rs. 415.00</td>
                      <td style={{ padding: '16px 8px' }} className="text-negative">-Rs. 2,250</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '16px 8px', fontWeight: 600 }}>BTC/PKR (Kraken)</td>
                      <td style={{ padding: '16px 8px' }}><span className="badge badge-warning">Crypto</span></td>
                      <td style={{ padding: '16px 8px' }}>0.05</td>
                      <td style={{ padding: '16px 8px' }}>Rs. 18.5M</td>
                      <td style={{ padding: '16px 8px' }}>Rs. 19.1M</td>
                      <td style={{ padding: '16px 8px' }} className="text-positive">+Rs. 30,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'risk':
        return (
          <div className="grid-dashboard animate-fade-in">
            <div className="glass-panel col-span-12">
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '20px' }}>Risk Engine Variables</h3>
              <div className="flex flex-col" style={{ gap: '20px' }}>
                 <div className="flex justify-between items-center p-4" style={{ background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div>
                       <h4 style={{fontSize:'1rem'}}>Global Stop-Loss Limit</h4>
                       <p className="text-muted" style={{fontSize: '0.85rem', marginTop: '4px'}}>Maximum allowable portfolio drawdown before auto-liquidating all positions.</p>
                    </div>
                    <div className="flex items-center" style={{gap:'16px'}}>
                       <span style={{fontSize:'1.4rem', fontWeight:700}} className="text-negative">8.5%</span>
                       <button className="btn-secondary">Adjust</button>
                    </div>
                 </div>
                 <div className="flex justify-between items-center p-4" style={{ background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div>
                       <h4 style={{fontSize:'1rem'}}>Max Position Sizing</h4>
                       <p className="text-muted" style={{fontSize: '0.85rem', marginTop: '4px'}}>Prevents the Portfolio agent from allocating too much capital to a single asset tier.</p>
                    </div>
                    <div className="flex items-center" style={{gap:'16px'}}>
                       <span style={{fontSize:'1.4rem', fontWeight:700}} className="text-warning">15%</span>
                       <button className="btn-secondary">Adjust</button>
                    </div>
                 </div>
                 <div className="flex justify-between items-center p-4" style={{ background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div>
                       <h4 style={{fontSize:'1rem'}}>Kraken Proxy Leverage</h4>
                       <p className="text-muted" style={{fontSize: '0.85rem', marginTop: '4px'}}>Maximum margin multiple allowed on cryptographic execution pairs.</p>
                    </div>
                    <div className="flex items-center" style={{gap:'16px'}}>
                       <span style={{fontSize:'1.4rem', fontWeight:700}} className="text-positive">2x</span>
                       <button className="btn-secondary">Adjust</button>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'logs':
        return (
          <div className="grid-dashboard animate-fade-in">
            <div className="glass-panel col-span-12">
              <div className="flex items-center justify-between" style={{marginBottom: '20px'}}>
                 <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>ERC-8004 Verification Ledger</h3>
                 <span className="badge badge-brand flex items-center" style={{gap:'6px'}}><Server size={14} /> Syncing Blocks</span>
              </div>
              <div className="flex flex-col" style={{ gap: '12px' }}>
                 {[ 
                    { hash: '0x8f2c...4A19', agent: 'Risk Agent', action: 'Set Stop-Loss Bounds [ENGRO]', time: '5 mins ago' },
                    { hash: '0x9a1e...1B2c', agent: 'Portfolio Agent', action: 'Requested Proxy Execution: BUY ENGRO', time: '7 mins ago' },
                    { hash: '0x4b3f...9C3a', agent: 'Analyst Agent', action: 'Committed TA Analysis Checkpoint', time: '12 mins ago' },
                    { hash: '0x1c4a...8D4b', agent: 'News Agent', action: 'Ingested 45 global news headers block', time: '20 mins ago' },
                 ].map((log, i) => (
                     <div key={i} className="flex justify-between items-center p-4" style={{ background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <div className="flex flex-col" style={{gap:'6px'}}>
                           <span className="text-muted" style={{fontSize: '0.85rem', fontFamily: 'monospace'}}>{log.hash}</span>
                           <span style={{fontWeight: 600, fontSize:'1rem'}}>{log.action}</span>
                        </div>
                        <div className="flex flex-col items-end" style={{gap:'6px'}}>
                           <span className="badge badge-positive">Verified Registry</span>
                           <span className="text-muted" style={{fontSize: '0.85rem'}}>{log.agent} &bull; {log.time}</span>
                        </div>
                     </div>
                 ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid-dashboard animate-fade-in">
            {/* Top Stats */}
            <div className="glass-panel col-span-3 stat-card">
              <span className="label">Total Managed Capital (PKR)</span>
              <span className="value">Rs. 4,250,000</span>
              <div className="flex items-center" style={{ gap: '4px', color: 'var(--positive)', fontSize: '0.9rem', fontWeight: 500 }}>
                <TrendingUp size={16} /> +12.4% this week
              </div>
            </div>
            
            <div className="glass-panel col-span-3 stat-card">
              <span className="label">Active Agent Positions</span>
              <span className="value">14</span>
              <div className="flex items-center" style={{ gap: '4px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                Across Equities & Crypto Forex
              </div>
            </div>

            <div className="glass-panel col-span-3 stat-card">
              <span className="label">Risk Exposure (Beta)</span>
              <span className="value text-positive">0.84</span>
              <div className="flex items-center" style={{ gap: '4px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                Below target threshold (1.20)
              </div>
            </div>

            <div className="glass-panel col-span-3 stat-card">
              <span className="label">Kraken Proxy Signals</span>
              <span className="value">28</span>
              <div className="flex items-center" style={{ gap: '4px', color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 500 }}>
                Executed in last 24h
              </div>
            </div>

            {/* Chart Section */}
            <div className="glass-panel col-span-8">
              <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>PSX Index vs Agent Performance</h3>
                <div className="flex" style={{ gap: '8px' }}>
                  <span className="badge badge-brand">Live Simulator</span>
                </div>
              </div>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `Rs.${val}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                    <Area type="monotone" dataKey="price" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Agents Activity Stream */}
            <div className="glass-panel col-span-4" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Multi-Agent Stream</h3>
                <History size={18} className="text-muted" />
              </div>
              <div className="flex flex-col" style={{ gap: '16px', overflowY: 'auto', flex: 1, paddingRight: '8px' }}>
                {stream.map((log, i) => (
                  <div key={i} className="flex" style={{ gap: '12px', padding: log.highlight ? '12px' : '0', background: log.highlight ? 'rgba(59, 130, 246, 0.1)' : 'transparent', borderRadius: '8px', border: log.highlight ? '1px solid rgba(59, 130, 246, 0.3)' : 'none' }}>
                    <div style={{ marginTop: '2px' }}>
                      {log.agent === 'Analyst' && <TrendingUp size={16} className="text-positive" />}
                      {log.agent === 'News' && <Box size={16} className="text-accent" style={{ color: 'var(--accent)' }} />}
                      {log.agent === 'Risk' && <Shield size={16} className="text-warning" />}
                      {log.agent === 'Portfolio' && <Target size={16} className="text-main" />}
                    </div>
                    <div className="flex flex-col" style={{ gap: '4px' }}>
                      <div className="flex items-center" style={{ gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{log.agent} Agent</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.time}</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: log.highlight ? 'var(--text-main)' : 'var(--text-muted)', lineHeight: 1.4 }}>{log.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Capabilities Area */}
            <div className="glass-panel col-span-12">
               <div className="flex flex-col" style={{ gap: '16px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>System Integrity</h3>
                  <div className="grid-dashboard">
                    <div className="col-span-4 p-4" style={{ background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div className="flex justify-between items-center mb-2">
                         <span style={{ fontWeight: 600 }}>Kraken Execution Layer</span>
                         <span className="badge badge-positive">Online</span>
                      </div>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>Proxy trading enabled. Simulating PnL in sandbox mode before mainnet launch.</p>
                    </div>

                    <div className="col-span-4 p-4" style={{ background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div className="flex justify-between items-center mb-2">
                         <span style={{ fontWeight: 600 }}>ERC-8004 Identity</span>
                         <span className="badge badge-positive">Verified</span>
                      </div>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>Agent reputation score and validation registry successfully syncing with blockchain checkpoints.</p>
                    </div>

                    <div className="col-span-4 p-4" style={{ background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div className="flex justify-between items-center mb-2">
                         <span style={{ fontWeight: 600 }}>PSX Data Scraper</span>
                         <span className="badge badge-warning">Syncing</span>
                      </div>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>Fetching historical and live market announcements from Pakistan Stock Exchange.</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="layout-main">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 800 }}>PakAI Capital</h1>
          <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Multi-Agent Strategy</p>
        </div>
        <div className="nav-links">
          <a href="#" className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>
            <Activity size={20} /> Dashboard
          </a>
          <a href="#" className={`nav-item ${activeTab === 'agents' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('agents'); }}>
            <Box size={20} /> Agent Network
          </a>
          <a href="#" className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('portfolio'); }}>
            <Target size={20} /> Portfolio
          </a>
          <a href="#" className={`nav-item ${activeTab === 'risk' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('risk'); }}>
            <Shield size={20} /> Risk Management
          </a>
          <a href="#" className={`nav-item ${activeTab === 'logs' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('logs'); }}>
            <TerminalSquare size={20} /> On-chain Logs
          </a>
        </div>
        <div style={{ marginTop: 'auto', padding: '24px' }}>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(16,185,129,0.05)' }}>
            <div className="flex items-center" style={{ gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--positive)' }} className="pulse-glow"></div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>System Active</span>
            </div>
            <div className="flex flex-col" style={{ gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Kraken CLI: Connected</span>
              <span>ERC-8004: Verified</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="content-area">
        {/* Header */}
        <header className="flex items-center justify-between col-span-12">
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
              {activeTab === 'dashboard' && 'AI execution overview'}
              {activeTab === 'agents' && 'Agent Swarm Network'}
              {activeTab === 'portfolio' && 'Capital Allocations'}
              {activeTab === 'risk' && 'Protocol Risk Rules'}
              {activeTab === 'logs' && 'Blockchain Registry'}
            </h2>
            <p className="text-muted">Real-time aggregate view of agent telemetry and live capital signals</p>
          </div>
          <div className="flex items-center" style={{ gap: '16px' }}>
            <button className="flex items-center justify-center p-2" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <Bell size={20} />
            </button>
            <button className="flex items-center justify-center p-2" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <Search size={20} />
            </button>
            <button className="btn-primary">
              <Server size={18} /> Manage Bots
            </button>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}
