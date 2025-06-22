// ===== Evolution Task Manager - Core Application =====

class EvoTaskManager {
    constructor() {
        this.tasks = [];
        this.currentGeneration = 1;
        this.evolutionStats = {
            adaptationScore: 85,
            survivingTasks: 0,
            eliminatedTasks: 0,
            mutationCount: {
                strategy: 4,
                tactical: 7
            }
        };
        
        this.environments = {
            competitive: [],
            collaborative: [],
            adaptive: []
        };
        
        this.init();
    }

    // ===== Initialization =====
    init() {
        this.loadData();
        this.bindEvents();
        this.renderDashboard();
        this.renderTasks();
        this.startEvolutionCycle();
        
        // Initialize insights panel
        this.initInsightsPanel();
        
        console.log('🧬 Evo Task Manager initialized - Evolution begins!');
    }

    // ===== Data Management (Local CRUD) =====
    loadData() {
        try {
            const savedData = localStorage.getItem('evoTaskManagerData');
            if (savedData) {
                const data = JSON.parse(savedData);
                this.tasks = data.tasks || [];
                this.currentGeneration = data.generation || 1;
                this.evolutionStats = { ...this.evolutionStats, ...data.stats };
            } else {
                // Initialize with sample evolutionary tasks
                this.createSampleTasks();
            }
            this.categorizeTasksByEnvironment();
        } catch (error) {
            console.error('Evolution data loading failed:', error);
            this.createSampleTasks();
        }
    }

    saveData() {
        try {
            const data = {
                tasks: this.tasks,
                generation: this.currentGeneration,
                stats: this.evolutionStats,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('evoTaskManagerData', JSON.stringify(data));
            console.log('🔄 Evolution data saved successfully');
        } catch (error) {
            console.error('Evolution data save failed:', error);
        }
    }

    createSampleTasks() {
        const sampleTasks = [
            {
                id: this.generateId(),
                title: 'Market Adaptation Strategy',
                description: 'Implement strategic mutations necessary for survival in competitive environments',
                priority: 'high',
                environment: 'competitive',
                adaptationScore: 92,
                deadline: this.getDateString(7),
                status: 'active',
                generation: 1,
                mutations: ['aggressive-pricing', 'rapid-response'],
                fitnessScore: 85
            },
            {
                id: this.generateId(),
                title: 'Partnership Co-evolution',
                description: 'Build collaborative evolution process through mutual benefits',
                priority: 'medium',
                environment: 'collaborative',
                adaptationScore: 78,
                deadline: this.getDateString(14),
                status: 'active',
                generation: 1,
                mutations: ['symbiotic-growth', 'mutual-adaptation'],
                fitnessScore: 72
            },
            {
                id: this.generateId(),
                title: 'Innovation Mutation Experiment',
                description: 'Adaptation experiment to new market niches',
                priority: 'low',
                environment: 'adaptive',
                adaptationScore: 65,
                deadline: this.getDateString(21),
                status: 'active',
                generation: 1,
                mutations: ['niche-exploration', 'trait-variation'],
                fitnessScore: 58
            }
        ];
        
        this.tasks = sampleTasks;
        this.saveData();
    }

    // ===== Evolution Algorithms =====
    runEvolutionCycle() {
        console.log(`🧬 Running Evolution Cycle - Generation ${this.currentGeneration}`);
        
        // Natural Selection Process
        this.naturalSelection();
        
        // Mutation Process
        this.introduceMutations();
        
        // Adaptation Process
        this.calculateAdaptationScores();
        
        // Environment Change Simulation
        this.simulateEnvironmentChange();
        
        // Update Generation
        this.currentGeneration++;
        
        // Update UI
        this.renderDashboard();
        this.renderTasks();
        this.saveData();
        
        this.showEvolutionInsight();
    }

    naturalSelection() {
        // Survival of the fittest algorithm
        this.tasks.forEach(task => {
            const survivalProbability = this.calculateSurvivalProbability(task);
            
            if (survivalProbability < 0.3 && task.status === 'active') {
                task.status = 'eliminated';
                this.evolutionStats.eliminatedTasks++;
                console.log(`❌ Task eliminated: ${task.title} (Fitness: ${task.fitnessScore})`);
            } else if (task.status === 'active') {
                // Enhance successful traits
                task.fitnessScore = Math.min(100, task.fitnessScore + Math.random() * 10);
                task.adaptationScore = Math.min(100, task.adaptationScore + Math.random() * 5);
            }
        });
        
        this.evolutionStats.survivingTasks = this.tasks.filter(t => t.status === 'active').length;
    }

    calculateSurvivalProbability(task) {
        const factors = {
            adaptationScore: task.adaptationScore / 100,
            environmentFit: this.getEnvironmentFitness(task),
            timeToDeadline: this.getTimeToDeadlineFactor(task),
            priorityWeight: this.getPriorityWeight(task.priority)
        };
        
        return (factors.adaptationScore * 0.4 + 
                factors.environmentFit * 0.3 + 
                factors.timeToDeadline * 0.2 + 
                factors.priorityWeight * 0.1);
    }

    introduceMutations() {
        const mutationTypes = [
            'strategy-pivot', 'tactical-enhancement', 'resource-optimization',
            'market-expansion', 'efficiency-boost', 'innovation-leap'
        ];
        
        this.tasks.forEach(task => {
            if (task.status === 'active' && Math.random() < 0.3) {
                const mutation = mutationTypes[Math.floor(Math.random() * mutationTypes.length)];
                task.mutations.push(mutation);
                
                // Mutation effects
                const mutationEffect = Math.random() * 20 - 10; // -10 to +10
                task.adaptationScore = Math.max(0, Math.min(100, task.adaptationScore + mutationEffect));
                
                console.log(`🧬 Mutation introduced: ${task.title} -> ${mutation}`);
                
                if (mutation.includes('strategy')) {
                    this.evolutionStats.mutationCount.strategy++;
                } else {
                    this.evolutionStats.mutationCount.tactical++;
                }
            }
        });
    }

    calculateAdaptationScores() {
        const totalAdaptation = this.tasks
            .filter(t => t.status === 'active')
            .reduce((sum, task) => sum + task.adaptationScore, 0);
        
        const activeTaskCount = this.tasks.filter(t => t.status === 'active').length;
        this.evolutionStats.adaptationScore = activeTaskCount > 0 ? 
            Math.round(totalAdaptation / activeTaskCount) : 0;
    }

    simulateEnvironmentChange() {
        // Simulate market environment changes
        const environmentChanges = [
            { type: 'competitive-pressure', impact: 0.1 },
            { type: 'collaborative-opportunity', impact: -0.05 },
            { type: 'innovation-demand', impact: 0.15 },
            { type: 'resource-scarcity', impact: 0.2 }
        ];
        
        const change = environmentChanges[Math.floor(Math.random() * environmentChanges.length)];
        
        this.tasks.forEach(task => {
            if (task.status === 'active') {
                const environmentMatch = this.getEnvironmentMatchScore(task, change.type);
                const adaptationChange = change.impact * environmentMatch * 100;
                task.adaptationScore = Math.max(0, Math.min(100, task.adaptationScore - adaptationChange));
            }
        });
        
        console.log(`🌍 Environment change: ${change.type} (Impact: ${change.impact})`);
    }

    // ===== Task Management =====
    createTask(taskData) {
        const newTask = {
            id: this.generateId(),
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            environment: taskData.environment,
            adaptationScore: parseInt(taskData.adaptationScore),
            deadline: taskData.deadline,
            status: 'active',
            generation: this.currentGeneration,
            mutations: [],
            fitnessScore: Math.random() * 50 + 30, // Initial fitness 30-80
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(newTask);
        this.categorizeTasksByEnvironment();
        this.saveData();
        this.renderTasks();
        this.renderDashboard();
        
        console.log(`✨ New task evolved: ${newTask.title}`);
        return newTask;
    }

    updateTask(taskId, updates) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
            this.categorizeTasksByEnvironment();
            this.saveData();
            this.renderTasks();
            console.log(`🔄 Task evolved: ${this.tasks[taskIndex].title}`);
        }
    }

    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            const task = this.tasks[taskIndex];
            this.tasks.splice(taskIndex, 1);
            this.categorizeTasksByEnvironment();
            this.saveData();
            this.renderTasks();
            this.renderDashboard();
            console.log(`🗑️ Task eliminated: ${task.title}`);
        }
    }

    completeTask(taskId) {
        this.updateTask(taskId, { 
            status: 'completed',
            completedAt: new Date().toISOString(),
            fitnessScore: 100
        });
    }

    categorizeTasksByEnvironment() {
        this.environments = {
            competitive: this.tasks.filter(t => t.environment === 'competitive' && t.status === 'active'),
            collaborative: this.tasks.filter(t => t.environment === 'collaborative' && t.status === 'active'),
            adaptive: this.tasks.filter(t => t.environment === 'adaptive' && t.status === 'active')
        };
    }

    // ===== UI Rendering =====
    renderDashboard() {
        // Update evolution stats
        document.getElementById('adaptationScore').textContent = `${this.evolutionStats.adaptationScore}%`;
        document.getElementById('generationCount').textContent = this.currentGeneration;
        document.getElementById('survivingTasks').textContent = this.evolutionStats.survivingTasks;
        document.getElementById('eliminatedTasks').textContent = this.evolutionStats.eliminatedTasks;
        
        // Update chart bar height
        const chartBar = document.querySelector('.chart-bar');
        if (chartBar) {
            chartBar.style.height = `${this.evolutionStats.adaptationScore}%`;
        }
        
        // Update mutation counts
        const mutationItems = document.querySelectorAll('.mutation-count');
        if (mutationItems.length >= 2) {
            mutationItems[0].textContent = this.evolutionStats.mutationCount.strategy;
            mutationItems[1].textContent = this.evolutionStats.mutationCount.tactical;
        }
    }

    renderTasks() {
        // Render tasks in each environment
        this.renderEnvironmentTasks('competitive', 'competitiveTasks');
        this.renderEnvironmentTasks('collaborative', 'collaborativeTasks');
        this.renderEnvironmentTasks('adaptive', 'adaptiveTasks');
    }

    renderEnvironmentTasks(environment, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const tasks = this.environments[environment];
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-environment">
                    <i class="fas fa-seedling"></i>
                    <p>No tasks have evolved in this environment yet</p>
                    <small>Create new tasks to begin evolution</small>
                </div>
            `;
            return;
        }
        
        container.innerHTML = tasks.map(task => this.createTaskCardHTML(task)).join('');
        
        // Add event listeners to task cards
        container.querySelectorAll('.task-card').forEach(card => {
            const taskId = card.dataset.taskId;
            
            // Task completion
            const completeBtn = card.querySelector('.complete-task');
            if (completeBtn) {
                completeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.completeTask(taskId);
                });
            }
            
            // Task editing
            const editBtn = card.querySelector('.edit-task');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.editTask(taskId);
                });
            }
            
            // Task deletion
            const deleteBtn = card.querySelector('.delete-task');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteTask(taskId);
                });
            }
        });
    }

    createTaskCardHTML(task) {
        const priorityClass = `priority-${task.priority}`;
        const daysLeft = this.getDaysUntilDeadline(task.deadline);
        const mutationsText = task.mutations.length > 0 ? 
            task.mutations.slice(-2).join(', ') : 'Basic Form';
        
        return `
            <div class="task-card" data-task-id="${task.id}">
                <div class="task-header">
                    <h4 class="task-title">${task.title}</h4>
                    <span class="task-priority ${priorityClass}">${this.getPriorityText(task.priority)}</span>
                </div>
                <p class="task-description">${task.description}</p>
                <div class="task-evolution-info">
                    <small class="evolution-detail">
                        <i class="fas fa-dna"></i>
                        Generation: ${task.generation} | Mutations: ${mutationsText}
                    </small>
                </div>
                <div class="task-footer">
                    <div class="task-adaptation">
                        <div class="adaptation-bar">
                            <div class="adaptation-fill" style="width: ${task.adaptationScore}%"></div>
                        </div>
                        <span class="adaptation-score">${task.adaptationScore}%</span>
                    </div>
                    <div class="task-deadline">
                        <i class="fas fa-clock"></i>
                        <span>${daysLeft} days</span>
                    </div>
                    <div class="task-actions">
                        <button class="task-action complete-task" title="Complete">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="task-action edit-task" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-action delete-task" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ===== Event Handlers =====
    bindEvents() {
        // Add task button
        const addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => this.openTaskModal());
        }
        
        // Modal controls
        const modal = document.getElementById('taskModal');
        const closeModal = document.getElementById('closeModal');
        const cancelTask = document.getElementById('cancelTask');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeTaskModal());
        }
        
        if (cancelTask) {
            cancelTask.addEventListener('click', () => this.closeTaskModal());
        }
        
        // Click outside modal to close
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeTaskModal();
                }
            });
        }
        
        // Task form submission
        const taskForm = document.getElementById('taskForm');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTaskSubmission();
            });
        }
        
        // Evolution cycle button
        const evolutionCycleBtn = document.getElementById('evolutionCycle');
        if (evolutionCycleBtn) {
            evolutionCycleBtn.addEventListener('click', () => {
                this.runEvolutionCycle();
                this.showNotification('Evolution cycle executed!', 'success');
            });
        }
        
        // Environment filter
        const environmentFilter = document.getElementById('environmentFilter');
        if (environmentFilter) {
            environmentFilter.addEventListener('change', (e) => {
                this.filterTasksByEnvironment(e.target.value);
            });
        }
        
        // Adaptation score range input
        const adaptationRange = document.getElementById('adaptationScore');
        const rangeValue = document.querySelector('.range-value');
        if (adaptationRange && rangeValue) {
            adaptationRange.addEventListener('input', (e) => {
                rangeValue.textContent = `${e.target.value}%`;
            });
        }
        
        // Insights panel toggle
        const toggleInsights = document.getElementById('toggleInsights');
        if (toggleInsights) {
            toggleInsights.addEventListener('click', () => {
                this.toggleInsightsPanel();
            });
        }
    }

    openTaskModal() {
        const modal = document.getElementById('taskModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus on first input
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeTaskModal() {
        const modal = document.getElementById('taskModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset form
            const form = document.getElementById('taskForm');
            if (form) {
                form.reset();
                document.querySelector('.range-value').textContent = '50%';
            }
        }
    }

    handleTaskSubmission() {
        const form = document.getElementById('taskForm');
        const formData = new FormData(form);
        
        const taskData = {
            title: formData.get('taskTitle') || document.getElementById('taskTitle').value,
            description: formData.get('taskDescription') || document.getElementById('taskDescription').value,
            priority: formData.get('taskPriority') || document.getElementById('taskPriority').value,
            environment: formData.get('taskEnvironment') || document.getElementById('taskEnvironment').value,
            deadline: formData.get('taskDeadline') || document.getElementById('taskDeadline').value,
            adaptationScore: formData.get('adaptationScore') || document.getElementById('adaptationScore').value
        };
        
        // Validation
        if (!taskData.title.trim()) {
            this.showNotification('Please enter a task name', 'error');
            return;
        }
        
        if (!taskData.deadline) {
            this.showNotification('Please set an adaptation deadline', 'error');
            return;
        }
        
        // Create task
        this.createTask(taskData);
        this.closeTaskModal();
        this.showNotification('New task has evolved!', 'success');
    }

    // ===== Utility Functions =====
    generateId() {
        return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getDateString(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    }

    getDaysUntilDeadline(deadline) {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }

    getPriorityText(priority) {
        const priorityMap = {
            high: 'High Pressure',
            medium: 'Medium Pressure',
            low: 'Low Pressure'
        };
        return priorityMap[priority] || priority;
    }

    getPriorityWeight(priority) {
        const weights = { high: 1.0, medium: 0.7, low: 0.4 };
        return weights[priority] || 0.5;
    }

    getEnvironmentFitness(task) {
        // Calculate how well task fits its environment
        const environmentFactors = {
            competitive: task.fitnessScore / 100,
            collaborative: (task.adaptationScore + task.fitnessScore) / 200,
            adaptive: Math.min(1, task.mutations.length / 3)
        };
        return environmentFactors[task.environment] || 0.5;
    }

    getTimeToDeadlineFactor(task) {
        const daysLeft = this.getDaysUntilDeadline(task.deadline);
        if (daysLeft <= 0) return 0;
        if (daysLeft <= 3) return 0.3;
        if (daysLeft <= 7) return 0.6;
        if (daysLeft <= 14) return 0.8;
        return 1.0;
    }

    getEnvironmentMatchScore(task, changeType) {
        const matches = {
            'competitive-pressure': task.environment === 'competitive' ? 1 : 0.3,
            'collaborative-opportunity': task.environment === 'collaborative' ? 1 : 0.3,
            'innovation-demand': task.environment === 'adaptive' ? 1 : 0.3,
            'resource-scarcity': 0.8 // Affects all environments
        };
        return matches[changeType] || 0.5;
    }

    filterTasksByEnvironment(environment) {
        const sections = document.querySelectorAll('.ecosystem-section');
        
        sections.forEach(section => {
            if (environment === 'all') {
                section.style.display = 'block';
            } else {
                const sectionId = section.id;
                const shouldShow = sectionId.includes(environment);
                section.style.display = shouldShow ? 'block' : 'none';
            }
        });
    }

    // ===== Insights Panel =====
    initInsightsPanel() {
        this.updateInsights();
    }

    toggleInsightsPanel() {
        const panel = document.getElementById('insightsPanel');
        if (panel) {
            panel.classList.toggle('active');
        }
    }

    updateInsights() {
        const insights = this.generateInsights();
        const insightsContent = document.querySelector('.insights-content');
        
        if (insightsContent) {
            insightsContent.innerHTML = insights.map(insight => `
                <div class="insight-card">
                    <h4>${insight.title}</h4>
                    <p>${insight.description}</p>
                    <div class="insight-action">
                        <small class="insight-confidence">信頼度: ${insight.confidence}%</small>
                    </div>
                </div>
            `).join('');
        }
    }

    generateInsights() {
        const activeTasks = this.tasks.filter(t => t.status === 'active');
        const insights = [];
        
        // Adaptation pattern analysis
        const avgAdaptation = activeTasks.reduce((sum, t) => sum + t.adaptationScore, 0) / activeTasks.length;
        if (avgAdaptation > 80) {
            insights.push({
                title: 'High Adaptation Environment',
                description: 'Current task groups show very high adaptation levels. Further evolution can be expected by introducing new challenging tasks.',
                confidence: 92
            });
        } else if (avgAdaptation < 50) {
            insights.push({
                title: 'Adaptation Improvement Needed',
                description: 'Task group adaptation is declining. Response to environmental changes and strategic mutations are needed.',
                confidence: 87
            });
        }
        
        // Environment distribution analysis
        const envCounts = {
            competitive: this.environments.competitive.length,
            collaborative: this.environments.collaborative.length,
            adaptive: this.environments.adaptive.length
        };
        
        const maxEnv = Object.keys(envCounts).reduce((a, b) => envCounts[a] > envCounts[b] ? a : b);
        if (envCounts[maxEnv] > activeTasks.length * 0.6) {
            insights.push({
                title: 'Environmental Diversity Recommended',
                description: `Tasks are concentrated in ${maxEnv} environment. Task deployment in other environments enables risk diversification and new opportunity creation.`,
                confidence: 78
            });
        }
        
        // Mutation effectiveness
        const mutatedTasks = activeTasks.filter(t => t.mutations.length > 0);
        if (mutatedTasks.length > 0) {
            const mutationSuccess = mutatedTasks.filter(t => t.adaptationScore > 70).length / mutatedTasks.length;
            if (mutationSuccess > 0.7) {
                insights.push({
                    title: 'Mutation Strategy Success',
                    description: 'Many of the introduced mutations are successful. We recommend applying similar mutation patterns to other tasks.',
                    confidence: 85
                });
            }
        }
        
        // Deadline pressure analysis
        const urgentTasks = activeTasks.filter(t => this.getDaysUntilDeadline(t.deadline) <= 7);
        if (urgentTasks.length > activeTasks.length * 0.3) {
            insights.push({
                title: 'Deadline Pressure Warning',
                description: 'Many tasks are approaching deadlines. Survival rate improvement through resource concentration and priority adjustment is needed.',
                confidence: 94
            });
        }
        
        return insights.length > 0 ? insights : [{
            title: 'Stable Evolution Environment',
            description: 'Current task ecosystem is stable. Please consider introducing new mutations or environmental changes to promote evolution.',
            confidence: 75
        }];
    }

    // ===== Evolution Cycle Automation =====
    startEvolutionCycle() {
        // Auto-evolution every 5 minutes
        setInterval(() => {
            if (this.tasks.filter(t => t.status === 'active').length > 0) {
                this.runEvolutionCycle();
                this.updateInsights();
            }
        }, 300000); // 5 minutes
        
        // Update insights every minute
        setInterval(() => {
            this.updateInsights();
        }, 60000); // 1 minute
    }

    // ===== Notifications =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 600;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .notification-success { background: #10b981; }
                .notification-error { background: #ef4444; }
                .notification-info { background: #3b82f6; }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    showEvolutionInsight() {
        const insights = [
            '🧬 Evolution cycle completed. New adaptation patterns detected.',
            '🌱 Natural selection allowed optimal tasks to survive and weak tasks were eliminated.',
            '🔬 New strategic features introduced through mutation process.',
            '📊 Environmental adaptation updated and prepared for next generation.'
        ];
        
        const randomInsight = insights[Math.floor(Math.random() * insights.length)];
        this.showNotification(randomInsight, 'info');
    }

    // ===== Task Editing =====
    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        // Populate modal with task data
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskEnvironment').value = task.environment;
        document.getElementById('taskDeadline').value = task.deadline;
        document.getElementById('adaptationScore').value = task.adaptationScore;
        document.querySelector('.range-value').textContent = `${task.adaptationScore}%`;
        
        // Change form submission to update instead of create
        const form = document.getElementById('taskForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.updateTaskFromForm(taskId);
        };
        
        this.openTaskModal();
    }

    updateTaskFromForm(taskId) {
        const formData = new FormData(document.getElementById('taskForm'));
        
        const updates = {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            priority: document.getElementById('taskPriority').value,
            environment: document.getElementById('taskEnvironment').value,
            deadline: document.getElementById('taskDeadline').value,
            adaptationScore: parseInt(document.getElementById('adaptationScore').value)
        };
        
        this.updateTask(taskId, updates);
        this.closeTaskModal();
        this.showNotification('Task has evolved!', 'success');
        
        // Reset form submission handler
        const form = document.getElementById('taskForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.handleTaskSubmission();
        };
    }
}

// ===== Application Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the Evolution Task Manager
    window.evoTaskManager = new EvoTaskManager();
    
    // Add some additional UI enhancements
    addUIEnhancements();
});

function addUIEnhancements() {
    // Add empty state styles
    const emptyStateStyles = document.createElement('style');
    emptyStateStyles.textContent = `
        .empty-environment {
            text-align: center;
            padding: 2rem;
            color: var(--gray-500);
        }
        .empty-environment i {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--gray-400);
        }
        .empty-environment p {
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        .empty-environment small {
            font-size: 0.875rem;
        }
        .evolution-detail {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--gray-500);
            margin-bottom: 1rem;
        }
        .task-deadline {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.875rem;
            color: var(--gray-600);
        }
    `;
    document.head.appendChild(emptyStateStyles);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + N: New task
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            if (window.evoTaskManager) {
                window.evoTaskManager.openTaskModal();
            }
        }
        
        // Escape: Close modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('taskModal');
            if (modal && modal.classList.contains('active')) {
                window.evoTaskManager.closeTaskModal();
            }
        }
        
        // Ctrl/Cmd + E: Run evolution cycle
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            if (window.evoTaskManager) {
                window.evoTaskManager.runEvolutionCycle();
            }
        }
    });
    
    console.log('🎯 UI enhancements loaded - Ready for evolution!');
} 