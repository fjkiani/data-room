import React from 'react';

// Super simple - just accept any component and render it
interface CustomReactContentProps {
  data: {
    component: any; // Keep it loose - any React component
  };
  layout?: string; // Don't care about layout constraints
}

const CustomReactContent: React.FC<CustomReactContentProps> = ({ data }) => {
  const { component: CustomComponent } = data;
  
  // If no component, show simple message
  if (!CustomComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">🤷‍♂️ No component found</h2>
          <p>Drop your React component here and it'll render</p>
        </div>
      </div>
    );
  }

  // Just render it - no fancy loading, no error handling, just render
  return <CustomComponent />;
};

export default CustomReactContent; 