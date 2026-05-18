# Shot Profile Dashboard

https://shot-profile-dash.vercel.app/

An interactive shot analysis dashboard for the [REDACTED TEAM]'s 2024-2025 regular season. Explore shot locations on a court diagram and compare player shot creation tendencies against their teammates.

## Tech Stack

- **[Next.js 16](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[Supabase](https://supabase.com/)**
- **[Recharts](https://recharts.org/)**
- **[Vercel](https://vercel.com/)**

Next.js was the natural choice for this project due to its App Router, built-in API routes, and seamless Vercel deployment. Next.js API routes are fully managed by Vercel, so each `route.ts` file automatically spins up its own serverless function without the need to stand up a separate backend server. The best perk is that deployments are simple and practically one-click.

Supabase provides a Postgres database with an official JavaScript client library which means no raw SQL is needed, reducing security risk.

## Dashboard Features

The web application contains two dashboards, each built around a different way of analyzing shot data.

**Shot Map Dashboard**  
The shot map dashboard plots each shot attempt on a half-court diagram, color-coded by outcome. The court can be filtered by player, shot type, outcome, contest level, and assisted status, letting users identify where on the floor a player shoots from and under what conditions.

At the team level view, the dashboard reveals broader team shooting trends such as shot distribution across zones or clusters of missed attempts from distance.

When scoped to a single player, hovering over any shot plot reveals a tooltip showing the shot type, contest level, assisted/unassisted, and how the shot was created - either catch & shoot or the number of dribbles taken before the attempt. This allows for closer inspection of individual shots when narrowing down filters.

**Player Tendencies Dashboard**  
The player tendencies dashboard displays a horizontal bar chart that compares a selected player's shot creation profile against the rest of the team (ROT) across four categories: spot-up, self-created, cut/off-ball, and post-up.

The dashboard isolates individual tendencies from the ROT baseline. Metrics are expressed as a percentage of total shot attempts rather than raw counts, which reduces playing time bias (i.e. it stops a high-volume player from looking like a more aggressive shot creator just because they have higher raw totals).

## Assumptions Made

- Assumed that the best way to compute ROT baselines is pooling all teammate shot attempts and calculating rates from that combined pool:  
  `rot_spot_up_rate = rot_spot_up_rate = teammate spot-up attempts / teammate total attempts` where teammate metrics exclude the selected player's metrics.  
  This means the baselines better reflect how the team collectively distributes its shots but high-volume players influence the baseline more than low-volume players.  
  The alternative, averaging each ROT teammate's individual rates (`rot_spot_up_rate = ((player1 spot-up% + player2 spot-up% + ... + playerN-1 spot-up%)/N-1)`), would weight all teammates equally but is more susceptible to small-sample distortion from players with limited shot attempts.
- Assumed heaves are outlier data since they're usually buzzer beaters. Heaves are excluded from the shot map partially due to it being noise and partially because I decided to implement a half-court display.

## Tradeoffs

- Data aggregations are currently handled in application code instead of the database queries. This was done because I knew the concrete constraints of the dataset (one regular season's worth of data for only 12 players) and the concrete parameters of this project. It's also easier to refactor in the case I decided to take the dashboard in a different direction (which I did at the half-way point). The dataset is small enough that computing metrics in the application code is fast and simpler than writing the equivalent database queries.
- The court diagram is rendered as a scalable vector graphic (SVG) with court lines drawn to scale using real NBA court dimensions, which ensures shot coordinates map accurately onto the diagram. The tradeoff is that an SVG court is less aesthetics focused than an illustrated graphic. A specially designed court graphic would look more polished, but would require extra time to create and extra calibration effort to align the coordinate system with the visual.
- The entire web application has a very minimal/utilitarian design; function was prioritized over aesthetics due to the nature of the assessment.

## Future Improvements

- Implement database schema as code to eliminate manual schema creation/updates and create version control.
- Add API caching layer to reduce database queries, improve latency, and cost; shot data for completed games never change so most, if not all, API responses can be cached.
- Add tests because tests are good.

## How I Would Extend if Dataset Was Larger

- Prioritize implementing a caching layer. A larger dataset increases query cost; caching offloads repeated work from the database, lowering latency and cost.
- Player selection in both dashboards would need to be refactored from a select field to a paginated list with a search field. This would improve both UX and database efficiency.
