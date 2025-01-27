
// types/UserJourney.ts
export class JourneyStep {
    public timestamp: number;
    public pageUrl: string;
    public action: string;
    public location?: string;
    public elementId?: string;
    public additionalData?: Record<string, any>;
  
    constructor(pageUrl: string, action: string, elementId?: string, additionalData?: Record<string, any>) {
      this.timestamp = Date.now();
      this.pageUrl = pageUrl;
      this.action = action;
      this.elementId = elementId;
      this.additionalData = additionalData;
    }

};

export class UserJourney {

    public sessionId: number;
    public steps: JourneyStep[];
    public startTime: Date;
    public city: string;
    public country: string;
    [key: string]: any;
  
    constructor(sessionId: number, steps: JourneyStep[] = [], city: string, country: string, startTime?: Date) {
      this.sessionId = sessionId;
      this.steps = steps;
      this.startTime = startTime || new Date();
      this.city = city;
      this.country = country;
    }
  
    public addStep(journeyStep: JourneyStep) {
      this.steps.push(journeyStep);
    }

    public getNumberOfSteps() {
      return this.steps.length;
    }

    public numberOfLinksClicked() {
      return this.steps.filter(step => step.action === 'link_click').length;
    }

    public didFormSubmit() {
      return this.steps.some(step => step.action === 'form_submit');
    }

    public didFormInteract() {
      return this.steps.some(step => step.action === 'form_interaction');
    }

    public static getAverageJourneyLength(journeys: UserJourney[]) {
      if(journeys.length === 0) return 0;
      return journeys.reduce((acc, journey) => acc + journey.getNumberOfSteps(), 0) / journeys.length;
    }

    public static getTotalJourneysByMonth(journeys: UserJourney[], month: number, year: number) {
      return journeys.filter(journey => journey.startTime.getMonth() === month && journey.startTime.getFullYear() === year).length;
    }

    public static getTotalJourneysByDay(journeys: UserJourney[], day: number, month: number) {
      return journeys.filter(journey => journey.startTime.getDate() === day && journey.startTime.getMonth() === month).length;
    }

    public static getLongestJourney(journeys: UserJourney[]) {
      if(journeys.length === 0) return null;
      return journeys.reduce((longest, current) => {
        return current.getNumberOfSteps() > longest.getNumberOfSteps() ? current : longest;
      });
    }

    public static getLongestJourneyByTime(journeys: UserJourney[]) {
      if(journeys.length === 0) return null;
      return journeys.reduce((longest, current) => {
        return current.startTime.getTime() > longest.startTime.getTime() ? current : longest;
      });
    }

    public static getBusiestDay(journeys: UserJourney[]) {
      if(journeys.length === 0) return null;
      const days = journeys.reduce((acc, journey) => {
        const date = journey.startTime.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const busiestDay = Object.keys(days).reduce((busiest, current) => {
        return days[current] > days[busiest] ? current : busiest;
      });

      return busiestDay;
    }

    public static formConversionRate(journeys: UserJourney[]) {
      const formJourneys = journeys.filter(journey => journey.steps.some(step => step.elementId === 'contact_form'));
      const formConversions = formJourneys.filter(journey => journey.steps.some(step => step.action === 'form_submit'));
      return formJourneys.length === 0 ? 0 : (100 * (formConversions.length / journeys.length));
    }

    public static monthlyConversionRate(journeys: UserJourney[], month: number, year: number) {
      const formJourneys = journeys.filter(journey => journey.steps.some(step => step.elementId === 'contact_form'));
      const formConversions = formJourneys.filter(journey => journey.steps.some(step => step.action === 'form_submit'));
      const monthlyJourneys = formJourneys.filter(journey => journey.startTime.getMonth() === month && journey.startTime.getFullYear() === year);
      const monthlyConversions = formConversions.filter(journey => journey.startTime.getMonth() === month && journey.startTime.getFullYear() === year);
      return monthlyJourneys.length === 0 ? 0 : (100 * (monthlyConversions.length / monthlyJourneys.length));
    }



  
    public log() {
      console.log('Logging user journey:', this);
    }
  
}



  