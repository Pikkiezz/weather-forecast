import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function airDescription() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* ---------------PM10------------ */}

      <Accordion type="single" collapsible className="w-full animate-slide-up-delay-1">
        <AccordionItem value="item-1" className="w-[1000px] border p-6 rounded-lg mb-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="text-md font-semibold text-[#373A70] py-2">
            PM10 Impact
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-6 bg-white rounded-lg p-6">
              <h1 className="text-lg font-semibold text-[#373A70]">
                PM10 (Particulate Matter 10)
              </h1>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-md font-semibold bg-[#4CAF50] w-[25%] h-[60px] text-white rounded-lg">
                  Good (0-20 µg/m³)
                </div>
                <span className="text-md w-[75%]">
                  Impact: This level is considered safe for most people. There
                  are no significant health effects for individuals with normal
                  health.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-md font-semibold bg-[#FFC107] w-[25%] h-[60px] text-white rounded-lg">
                  Moderate (20-50 µg/m³)
                </div>
                <span className="text-md w-[75%]">
                  Impact: This level may cause slight effects on people with
                  respiratory conditions, such as asthma, and those with heart
                  issues. It's generally safe for the majority of people.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-md font-semibold bg-[#F44336] w-[25%] h-[60px] text-white rounded-lg">
                  Unhealthy (50-100 µg/m³)
                </div>
                <span className="text-md w-[75%]">
                  Impact: This level can cause health issues for the general
                  population and especially for sensitive groups (e.g.,
                  children, elderly, or those with pre-existing heart or lung
                  diseases). Symptoms like difficulty breathing or worsened
                  respiratory conditions may appear.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full">
                <div className="flex justify-center items-center text-md font-semibold bg-[#880E4F] w-[25%] h-[60px] text-white rounded-lg">
                  Hazardous ({">"}100 µg/m³)
                </div>
                <span className="text-md w-[75%]">
                  Impact: This is a dangerous level for everyone, especially
                  individuals with respiratory or cardiovascular issues. It can
                  cause severe health effects like difficulty breathing,
                  increased respiratory symptoms, and potentially
                  life-threatening conditions.
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* ---------------PM2.5------------ */}

      <Accordion type="single" collapsible className="w-full animate-slide-up-delay-2">
        <AccordionItem value="item-1" className="w-[1000px] border p-6 rounded-lg mb-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="text-md font-semibold text-[#373A70] py-2">
            PM2.5 Impact
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-6 bg-white rounded-lg p-6">
              <h1 className="text-lg font-semibold text-[#373A70]">
                PM2.5 (Particulate Matter 2.5)
              </h1>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-md font-semibold bg-[#4CAF50] w-[25%] h-[60px] text-white rounded-lg">
                  Good (0-10 µg/m³)
                </div>
                <span className="text-md w-[75%]">
                  Impact: Air quality is considered safe, with no health impacts
                  for most people.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-md font-semibold bg-[#FFC107] w-[25%] h-[60px] text-white rounded-lg">
                  Moderate (10-20 µg/m³)
                </div>
                <span className="text-md w-[75%]">
                  Impact: This level may cause mild effects on people with
                  pre-existing respiratory conditions or those with heart
                  diseases. The general population is usually unaffected.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-md font-semibold bg-[#F44336] w-[25%] h-[60px] text-white rounded-lg">
                  Unhealthy (20-50 µg/m³)
                </div>
                <span className="text-md w-[75%]">
                  Impact: This level can cause significant effects on sensitive
                  individuals (e.g., people with heart and lung conditions) and
                  may lead to symptoms like difficulty breathing, coughing, or
                  increased discomfort in the chest.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full">
                <div className="flex justify-center items-center text-md font-semibold bg-[#880E4F] w-[25%] h-[60px] text-white rounded-lg">
                  Hazardous ({">"}50 µg/m³)
                </div>
                <span className="text-md w-[75%]">
                  Impact: Exposure to this level is highly dangerous for
                  everyone, especially for people with pre-existing health
                  conditions. It can lead to severe respiratory problems,
                  fatigue, headaches, dizziness, and potentially dangerous heart
                  and lung issues.
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* ---------------Carbon Monoxide------------ */}

      <Accordion type="single" collapsible className="w-full animate-slide-up-delay-3">
        <AccordionItem value="item-1" className="w-[1000px]  border p-6 rounded-lg mb-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <AccordionTrigger className="text-md font-semibold text-[#373A70] py-2">
            Carbon Monoxide Impact
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-6 bg-white rounded-lg p-6">
              <h1 className="text-lg font-semibold text-[#373A70]">
                Carbon Monoxide (CO)
              </h1>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-md font-semibold bg-[#4CAF50] w-[25%] h-[60px] text-white rounded-lg">
                  Good (0-4.4 ppm)
                </div>
                <span className="text-md w-[75%]">
                  Impact: The air quality is normal and considered safe, with no
                  significant health impacts.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-md font-semibold bg-[#FFC107] w-[25%] h-[60px] text-white rounded-lg">
                  Moderate (4.5-9.4 ppm)
                </div>
                <span className="text-md w-[75%]">
                  Impact: While generally safe, this level may cause mild
                  effects such as headaches or dizziness in sensitive
                  individuals, particularly those with heart or respiratory
                  issues.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-sm px-2 text-center font-semibold bg-[#FF9800] w-[25%] h-[60px] text-white rounded-lg">
                  Unhealthy for Sensitive Groups (9.5-12.4 ppm)
                </div>
                <span className="text-md w-[75%]">
                  Impact: Individuals in sensitive groups, like those with
                  asthma or heart conditions, may start experiencing symptoms
                  such as headaches, dizziness, or shortness of breath. It's
                  advisable for these groups to limit exposure.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex justify-center items-center text-sm font-semibold bg-[#F44336] w-[25%] h-[60px] text-white rounded-lg">
                  Unhealthy (12.5-15.4 ppm)
                </div>
                <span className="text-md w-[75%]">
                  Impact: Exposure at this level can cause headaches, fatigue,
                  dizziness, shortness of breath, and more serious health
                  effects, particularly for people with heart or respiratory
                  conditions.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full border-b border-gray-200 pb-6">
                <div className="flex flex-col justify-center items-center px-2 text-sm font-semibold bg-[#9C27B0] w-[25%] h-[60px] text-white rounded-lg">
                  Very Unhealthy <p>(15.5-30.4 ppm)</p>
                </div>
                <span className="text-md w-[75%]">
                  Impact: This level of carbon monoxide is very dangerous,
                  causing severe health issues such as loss of consciousness,
                  difficulty breathing, confusion, and even organ damage,
                  especially for sensitive individuals.
                </span>
              </div>

              <div className="flex items-center gap-8 w-full">
                <div className="flex justify-center items-center text-sm font-semibold bg-[#880E4F] w-[25%] h-[60px] text-white rounded-lg">
                  Hazardous ({">"}30.5 ppm)
                </div>
                <span className="text-md w-[75%]">
                  Impact: This is an emergency-level condition, where exposure
                  to this level can lead to life-threatening situations,
                  including respiratory failure, loss of consciousness, and
                  potentially fatal effects for anyone exposed.
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
