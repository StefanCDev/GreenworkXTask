const fs = require('fs');

// Read role data from the JSON file
const rawData = fs.readFileSync('roles.json');
const roles = JSON.parse(rawData);

// Function to calculate match scores
function getScoredUserJobMatches(userAttributes) {
  const matches = [];
  
  roles.forEach(role => {
    const matchScore =
      userAttributes.willingnessToWorkOutdoors * role.outdoorsExtent +
      userAttributes.willingnessToLearnHandsOnSkills * role.handsOnExtent +
      userAttributes.willingnessToWorkWithTechnology * role.technologyExtent;
    
    matches.push({ role: role.name, matchScore });
  });
  
  // Sort matches based on match scores (descending)
  matches.sort((a, b) => b.matchScore - a.matchScore);
  
  // Return top three matches
  return matches.slice(0, 3);
}

// User attributes
const userAttributes = {
  willingnessToWorkOutdoors: 0.7,
  willingnessToLearnHandsOnSkills: 0.5,
  willingnessToWorkWithTechnology: 0.9,
};

// Get and display top matches
const topMatches = getScoredUserJobMatches(userAttributes);
console.log("Top Matches:", topMatches);
