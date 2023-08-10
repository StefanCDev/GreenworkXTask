# Load the file system module
module fs
  .require('fs')
end

# Read role data from the JSON file
rawData = fs.readFileSync('roles.json')
roles = JSON.parse(rawData)

# Function to calculate match scores
function getScoredUserJobMatches(userAttributes)
  matches = []

  for each role in roles
    matchScore =
      userAttributes.willingnessToWorkOutdoors * role.outdoorsExtent +
      userAttributes.willingnessToLearnHandsOnSkills * role.handsOnExtent +
      userAttributes.willingnessToWorkWithTechnology * role.technologyExtent

    matches.push({ role: role.name, matchScore })
  end for

  # Sort matches based on match scores (descending)
  sort(matches, descending)

  # Return top three matches
  return matches.slice(0, 3)
end function

# User attributes (you can adjust these values)
userAttributes = {
  willingnessToWorkOutdoors: 0.7,
  willingnessToLearnHandsOnSkills: 0.5,
  willingnessToWorkWithTechnology: 0.9
}

# Get and display top matches
topMatches = getScoredUserJobMatches(userAttributes)
print("Top Matches:", topMatches)
