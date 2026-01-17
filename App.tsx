
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CHECKLIST_DATA } from './data';
import { Stage, ChecklistState, SubSection } from './types';

// Icons
const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Components
const ProgressRing = ({ percentage, onClick }: { percentage: number, onClick: () => void }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div 
      onClick={onClick}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full cursor-pointer hover:scale-105 transition-transform group"
    >
      <div className="absolute inset-0 bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/20 transition-colors rounded-full" />
      <svg className="w-20 h-20 transform -rotate-90 relative">
        <circle
          className="text-slate-700"
          strokeWidth="6"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className="text-cyan-400 transition-all duration-700 ease-in-out"
          strokeWidth="6"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

const SubSectionProgress = ({ percentage }: { percentage: number }) => (
  <div className="flex items-center gap-2 mt-1">
    <div className="h-1 flex-1 bg-slate-700/50 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-500 ${percentage === 100 ? 'bg-emerald-500' : 'bg-cyan-500/70'}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
    <span className={`text-[10px] font-bold min-w-[30px] text-right ${percentage === 100 ? 'text-emerald-400' : 'text-slate-500'}`}>
      {Math.round(percentage)}%
    </span>
  </div>
);

const App: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<ChecklistState>(() => {
    const saved = localStorage.getItem('ai_agent_checklist');
    return saved ? JSON.parse(saved) : {};
  });

  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>(() => ({
    'stage-01': true 
  }));

  const [showBreakdown, setShowBreakdown] = useState(false);
  const [stage1Path, setStage1Path] = useState<'all' | 'outbound' | 'inbound' | 'technical'>(() => {
    const saved = localStorage.getItem('ai_agent_stage1_path');
    return (saved as any) || 'all';
  });

  useEffect(() => {
    localStorage.setItem('ai_agent_checklist', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('ai_agent_stage1_path', stage1Path);
  }, [stage1Path]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleStageExpand = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const getSubSectionStats = useCallback((sub: SubSection) => {
    let total = sub.tasks.length;
    let completed = sub.tasks.filter(t => completedTasks[t.id]).length;
    return { total, completed, percentage: total > 0 ? (completed / total) * 100 : 0 };
  }, [completedTasks]);

  const getStageStats = useCallback((stage: Stage) => {
    let total = 0;
    let completed = 0;

    if (stage.subSections) {
      stage.subSections.forEach(ss => {
        ss.tasks.forEach(t => {
          total++;
          if (completedTasks[t.id]) completed++;
        });
      });
    } else if (stage.tasks) {
      stage.tasks.forEach(t => {
        total++;
        if (completedTasks[t.id]) completed++;
      });
    }

    return { total, completed, percentage: total > 0 ? (completed / total) * 100 : 0 };
  }, [completedTasks]);

  const toggleAllInSubSection = (sub: SubSection, forceValue?: boolean) => {
    const subStats = getSubSectionStats(sub);
    const newValue = forceValue !== undefined ? forceValue : subStats.percentage < 100;
    
    const updates: ChecklistState = {};
    sub.tasks.forEach(t => {
      updates[t.id] = newValue;
    });

    setCompletedTasks(prev => ({ ...prev, ...updates }));
  };

  const toggleAllInStage = (stage: Stage, forceValue?: boolean) => {
    const { percentage } = getStageStats(stage);
    const newValue = forceValue !== undefined ? forceValue : percentage < 100;
    
    const updates: ChecklistState = {};
    const processTasks = (tasks: any[]) => {
      tasks.forEach(t => updates[t.id] = newValue);
    };

    if (stage.subSections) {
      stage.subSections.forEach(ss => processTasks(ss.tasks));
    } else if (stage.tasks) {
      processTasks(stage.tasks);
    }

    setCompletedTasks(prev => ({ ...prev, ...updates }));
  };

  const overallStats = useMemo(() => {
    let total = 0;
    let completed = 0;
    CHECKLIST_DATA.forEach(stage => {
      const stats = getStageStats(stage);
      total += stats.total;
      completed += stats.completed;
    });
    return { total, completed, percentage: total > 0 ? (completed / total) * 100 : 0 };
  }, [getStageStats]);

  const resetAll = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setCompletedTasks({});
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 selection:bg-cyan-500/30 pb-24">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12 md:px-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 bg-slate-800/40 p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
              AI CALL AGENT <br /> COMPLETE CHECKLIST
            </h1>
            <p className="text-slate-400 max-w-lg text-lg">
              Manage every phase of your AI voice agent lifecycle with clinical precision.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-white/10 shadow-inner group transition-all hover:border-cyan-500/30">
            <ProgressRing percentage={overallStats.percentage} onClick={() => setShowBreakdown(true)} />
            <div className="text-center">
              <button 
                onClick={() => setShowBreakdown(true)}
                className="text-xs uppercase tracking-widest text-slate-400 font-black mb-1 hover:text-cyan-400 transition-colors"
              >
                View Breakdown
              </button>
              <div className="text-sm text-slate-500">
                <span className="text-white font-bold">{overallStats.completed}</span> / <span className="text-slate-300 font-bold">{overallStats.total}</span> Tasks
              </div>
            </div>
          </div>
        </header>

        {/* Breakdown Modal Overlay */}
        {showBreakdown && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-800 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
              <button 
                onClick={() => setShowBreakdown(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
              <h3 className="text-2xl font-black text-white mb-6">Mission Progress</h3>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {CHECKLIST_DATA.map(stage => {
                  const stats = getStageStats(stage);
                  return (
                    <div key={stage.id} className="group">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 group-hover:text-cyan-400 transition-colors">
                        <span>{stage.number}. {stage.title}</span>
                        <span>{Math.round(stats.percentage)}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${stats.percentage === 100 ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                          style={{ width: `${stats.percentage}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">{stats.completed} of {stats.total} items</div>
                    </div>
                  );
                })}
              </div>
              <button 
                onClick={() => setShowBreakdown(false)}
                className="w-full mt-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20"
              >
                Return to Command Center
              </button>
            </div>
          </div>
        )}

        {/* Stage List */}
        <div className="space-y-6">
          {CHECKLIST_DATA.map((stage) => {
            const stats = getStageStats(stage);
            const isExpanded = expandedStages[stage.id];
            
            return (
              <div 
                key={stage.id} 
                className={`group border transition-all duration-300 rounded-3xl overflow-hidden ${
                  isExpanded ? 'bg-slate-800/40 border-white/20 shadow-2xl' : 'bg-slate-800/20 border-white/5 hover:border-white/10'
                }`}
              >
                {/* Stage Header */}
                <div 
                  className="flex items-center justify-between p-6 cursor-pointer select-none"
                  onClick={() => toggleStageExpand(stage.id)}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-2xl text-xl font-black transition-colors ${
                      stats.percentage === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {stage.number}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h2 className={`text-xl font-bold truncate ${stats.percentage === 100 ? 'text-emerald-400 line-through opacity-70' : 'text-white'}`}>
                          {stage.title}
                        </h2>
                        {stats.percentage === 100 && (
                          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Complete</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="h-1.5 w-32 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${stats.percentage === 100 ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                            style={{ width: `${stats.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{Math.round(stats.percentage)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAllInStage(stage);
                      }}
                      title="Select All Stage"
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all duration-200 ${
                        stats.percentage === 100 
                          ? 'bg-cyan-500 border-cyan-500 text-white' 
                          : 'border-slate-600 hover:border-cyan-500 text-transparent'
                      }`}
                    >
                      <CheckIcon />
                    </div>
                    <ChevronDownIcon isOpen={isExpanded} />
                  </div>
                </div>

                {/* Stage Content */}
                {isExpanded && (
                  <div className="px-6 pb-8 animate-in slide-in-from-top-4 duration-500">
                    <div className="h-px bg-white/10 mb-6" />
                    
                    {stage.id === 'stage-01' && (
                      <div className="mb-8">
                        <div className="text-xs font-black uppercase text-slate-500 mb-3 tracking-widest">Select Build Path</div>
                        <div className="flex flex-wrap gap-2">
                          {(['all', 'outbound', 'inbound', 'technical'] as const).map(p => (
                            <button
                              key={p}
                              onClick={() => setStage1Path(p)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                                stage1Path === p 
                                  ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-900/30' 
                                  : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {stage.description && (
                      <p className="text-slate-400 mb-8 italic border-l-2 border-cyan-500/50 pl-4 py-1 leading-relaxed text-sm">
                        {stage.description}
                      </p>
                    )}

                    {stage.subSections ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {stage.subSections
                          .filter(ss => stage1Path === 'all' || ss.category === 'general' || ss.category === stage1Path)
                          .map((sub) => {
                            const subStats = getSubSectionStats(sub);
                            return (
                              <div 
                                key={sub.id} 
                                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                                  subStats.percentage === 100 
                                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                                    : 'bg-slate-900/40 border-white/5 shadow-lg'
                                }`}
                              >
                                <div className="mb-4">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className={`font-bold flex items-center gap-2 ${subStats.percentage === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${subStats.percentage === 100 ? 'bg-emerald-400' : 'bg-cyan-400'}`}></span>
                                        {sub.title}
                                      </h3>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      {/* Sub-section Select All Checkbox */}
                                      <div 
                                        onClick={() => toggleAllInSubSection(sub)}
                                        title="Select All Tasks"
                                        className={`w-6 h-6 rounded flex items-center justify-center border transition-all cursor-pointer ${
                                          subStats.percentage === 100 
                                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                                            : 'bg-slate-800 border-white/10 text-transparent hover:border-cyan-400'
                                        }`}
                                      >
                                        <CheckIcon />
                                      </div>
                                      {sub.category && sub.category !== 'general' && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 uppercase tracking-tighter">
                                          {sub.category}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <SubSectionProgress percentage={subStats.percentage} />
                                </div>
                                <div className="space-y-3 flex-1">
                                  {sub.tasks.map((task) => (
                                    <TaskItem 
                                      key={task.id} 
                                      task={task} 
                                      onToggle={() => toggleTask(task.id)} 
                                      completed={!!completedTasks[task.id]}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <div className="space-y-4 max-w-2xl bg-slate-900/40 p-6 rounded-2xl border border-white/5">
                        {stage.tasks?.map((task) => (
                          <TaskItem 
                            key={task.id} 
                            task={task} 
                            onToggle={() => toggleTask(task.id)} 
                            completed={!!completedTasks[task.id]}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="mt-12 py-12 text-center text-slate-600 text-sm border-t border-white/5">
        <div className="flex justify-center gap-4 mb-4">
          <button onClick={resetAll} className="flex items-center gap-2 px-4 py-2 text-xs hover:text-rose-400 transition-colors">
            <TrashIcon /> Wipe Project Data
          </button>
        </div>
        <p>© {new Date().getFullYear()} AI CALL AGENT COMPLETE CHECKLIST</p>
        <p className="mt-1 opacity-50">Industrial Grade Project Tracking</p>
      </footer>
    </div>
  );
};

interface TaskItemProps {
  task: { id: string; label: string };
  completed: boolean;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, completed, onToggle }) => {
  return (
    <label className="flex items-start gap-3 group cursor-pointer select-none">
      <div className="relative mt-0.5">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={completed} 
          onChange={onToggle}
        />
        <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
          completed 
            ? 'bg-cyan-500 border-cyan-500 text-white' 
            : 'border-slate-600 group-hover:border-cyan-400 text-transparent'
        }`}>
          <CheckIcon />
        </div>
      </div>
      <span className={`text-sm leading-tight transition-all duration-200 ${
        completed ? 'text-slate-500 line-through italic' : 'text-slate-300 group-hover:text-white'
      }`}>
        {task.label}
      </span>
    </label>
  );
};

export default App;
