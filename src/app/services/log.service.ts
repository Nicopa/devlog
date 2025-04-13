import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Log {
  timestamp: string;
  category: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logs = new BehaviorSubject<Log[]>([]);
  private logsSaved = false;
  private autoSaveInterval: any;

  get isLogsSaved(): boolean {
    return this.logsSaved;
  }

  get logsCount(): number {
    return this.logs.value.length;
  }

  getLogs(): Observable<Log[]> {
    return this.logs.asObservable();
  }

  addLog(log: Log): void {
    const currentLogs = this.logs.value;
    this.logs.next([...currentLogs, log]);
    this.logsSaved = false;
  }

  updateLog(index: number, log: Log): void {
    const currentLogs = this.logs.value;
    currentLogs[index] = log;
    this.logs.next([...currentLogs]);
    this.logsSaved = false;
  }

  deleteLog(index: number): void {
    const currentLogs = this.logs.value;
    currentLogs.splice(index, 1);
    this.logs.next([...currentLogs]);
  }

  clearLogs() {
    this.logs.next([]);
    this.logsSaved = false;
  }

  private getFormattedLogsForSaving() {
    const logs = this.logs.value;
    //since description can contain ' - ' we need to escape it
    //and description can contain new lines so we need to replace them with '\n'
    return logs.map(log => `${log.timestamp} - ${log.category} - ${log.description.replace(/\s-\s/g, '\\-').replace(/\n/g, '\\n')}`).join('\n');
  }

  saveLogs() {
    const logString = this.getFormattedLogsForSaving();
    const blob = new Blob([logString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${new Date().toISOString().split('T')[0]}_${new Date().toISOString().split('T')[1].split('.')[0]}_logs.txt`;
    a.click();
    URL.revokeObjectURL(url);
    this.logsSaved = true;
  }

  loadLogs(text: string) {
    const logs = text.split('\n').map(log => {
      const [timestamp, category, description] = log.split(' - ');
      return { timestamp, category, description: description.replace(/\\n/g, '\n').replace(/\\-/g, ' - ') };
    });
    this.logs.next(logs);
    this.logsSaved = true;
  }

  ngOnDestroy(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }
} 