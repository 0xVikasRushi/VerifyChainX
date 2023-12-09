import express from 'express';
import newVoters from '../models/newvoter.model.js';

const router = express.Router();

router.get('/calculate-votes/:eventuuid', async (req, res) => {
    try {
        const { eventuuid } = req.params;

        const voters = await newVoters.find({ event_uuid: eventuuid });

        if (!voters || voters.length === 0) {
            return res.status(404).send('No voters found for the given event uuid');
        }

        const projects = Object.keys(voters[0].vote_data);

        const projectVotes = {};
        const totalVotes = {};
        const quadraticVotes = {};

        projects.forEach((project) => {
            projectVotes[project] = 0;
            totalVotes[project] = 0;
        });

        voters.forEach((voter) => {
            projects.forEach((project) => {
                const votes = voter.vote_data[project];
                projectVotes[project] += Math.sqrt(votes);
                totalVotes[project] += votes;
            });
        });

        projects.forEach((project) => {
            quadraticVotes[project] = Math.pow(projectVotes[project], 2);
        });

        const totalQuadraticVotesSquared = Object.values(quadraticVotes).reduce((acc, value) => acc + value, 0);

        const matchingPoolFactors = {};
        projects.forEach((project) => {
            matchingPoolFactors[project] = quadraticVotes[project] / totalQuadraticVotesSquared;
        });

        const result = {};
        projects.forEach((project) => {
            result[project] = {
                QVotingRatio: matchingPoolFactors[project],
                totalVotes: totalVotes[project],
            };
        });

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
