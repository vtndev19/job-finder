import React, { useState, useEffect } from 'react';
import '../styles/AdminMonitoring.scss';

export default function AdminMonitoring() {
    const [metrics, setMetrics] = useState({
        server: {
            status: 'healthy',
            cpu: 45,
            ram: 62,
            disk: 78
        },
        database: {
            status: 'healthy',
            connections: 125,
            queryTime: 12
        },
        api: {
            status: 'healthy',
            errorRate: 0.5,
            responseTime: 150
        }
    });

    useEffect(() => {
        // Simulate real-time updates
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                server: {
                    ...prev.server,
                    cpu: Math.floor(Math.random() * 100),
                    ram: Math.floor(Math.random() * 100),
                    disk: Math.floor(Math.random() * 100)
                }
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const MetricCard = ({ title, value, unit, status, max = 100 }) => {
        const percentage = (value / max) * 100;
        const statusColor = status === 'healthy' ? $success : status === 'warning' ? $warning : $error;

        return (
            <div className="metric-card">
                <h3>{title}</h3>
                <div className="metric-value">
                    {value}{unit && <span className="unit">{unit}</span>}
                </div>
                <div className="metric-bar">
                    <div
                        className="metric-bar-fill"
                        style={{
                            width: `${percentage}%`,
                            background: statusColor
                        }}
                    ></div>
                </div>
                <div className={`metric-status ${status}`}>
                    <i className={`fas fa-circle`}></i> {status === 'healthy' ? 'Bình thường' : status === 'warning' ? 'Cảnh báo' : 'Lỗi'}
                </div>
            </div>
        );
    };

    return (
        <div className="admin-monitoring">
            <div className="page-header">
                <h2>Giám sát hệ thống</h2>
                <div className="header-actions">
                    <button className="btn btn-primary">
                        <i className="fas fa-sync"></i> Làm mới
                    </button>
                </div>
            </div>

            <div className="monitoring-sections">
                <section className="monitoring-section">
                    <h3>Trạng thái Server</h3>
                    <div className="metrics-grid">
                        <MetricCard
                            title="CPU Usage"
                            value={metrics.server.cpu}
                            unit="%"
                            status={metrics.server.cpu > 80 ? 'warning' : 'healthy'}
                        />
                        <MetricCard
                            title="RAM Usage"
                            value={metrics.server.ram}
                            unit="%"
                            status={metrics.server.ram > 80 ? 'warning' : 'healthy'}
                        />
                        <MetricCard
                            title="Disk Usage"
                            value={metrics.server.disk}
                            unit="%"
                            status={metrics.server.disk > 80 ? 'warning' : 'healthy'}
                        />
                    </div>
                </section>

                <section className="monitoring-section">
                    <h3>Database Performance</h3>
                    <div className="metrics-grid">
                        <MetricCard
                            title="Connections"
                            value={metrics.database.connections}
                            status={metrics.database.status}
                            max={200}
                        />
                        <MetricCard
                            title="Query Time"
                            value={metrics.database.queryTime}
                            unit="ms"
                            status={metrics.database.queryTime > 100 ? 'warning' : 'healthy'}
                            max={500}
                        />
                    </div>
                </section>

                <section className="monitoring-section">
                    <h3>API Performance</h3>
                    <div className="metrics-grid">
                        <MetricCard
                            title="Error Rate"
                            value={metrics.api.errorRate}
                            unit="%"
                            status={metrics.api.errorRate > 5 ? 'error' : metrics.api.errorRate > 2 ? 'warning' : 'healthy'}
                            max={10}
                        />
                        <MetricCard
                            title="Response Time"
                            value={metrics.api.responseTime}
                            unit="ms"
                            status={metrics.api.responseTime > 500 ? 'warning' : 'healthy'}
                            max={1000}
                        />
                    </div>
                </section>

                <section className="monitoring-section">
                    <h3>Cảnh báo real-time</h3>
                    <div className="alerts-list">
                        <div className="alert-item warning">
                            <i className="fas fa-exclamation-triangle"></i>
                            <div className="alert-content">
                                <h4>CPU usage cao</h4>
                                <p>CPU usage đạt 85% - Cần kiểm tra</p>
                                <span className="alert-time">2 phút trước</span>
                            </div>
                        </div>
                        <div className="alert-item info">
                            <i className="fas fa-info-circle"></i>
                            <div className="alert-content">
                                <h4>Backup thành công</h4>
                                <p>Database backup đã hoàn thành</p>
                                <span className="alert-time">1 giờ trước</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

