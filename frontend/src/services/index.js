export function payloadForBackend(votes) {
  const flatVotes = []
  
  Object.entries(votes).forEach(([catId, distribution]) => {
    const category_id = catId === 'absolute' ? null : Number(catId)
    
    Object.entries(distribution).forEach(([points, teamId]) => {
      if (teamId !== null) {
        flatVotes.push({
          category_id,
          team_id: Number(teamId),
          points: Number(points)
        })
      }
    })
  })
  
  return { votes: flatVotes }
}