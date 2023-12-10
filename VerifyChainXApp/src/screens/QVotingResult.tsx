import { Box, Center, ScrollView, Text } from "native-base";
import React, { useState, useEffect } from "react";
import QVSCard from "../components/QVSCard";
import { fetchAllEvents } from "../shared/api";
import { AppStackScreenProps, Event } from "../types";
import { calculateHoursRemaining } from "../shared/shared";

type QVotingProps = AppStackScreenProps<"QVotingResult">;

const QVotingResult: React.FC<QVotingProps> = ({ navigation }) => {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    getQVoting();
  }, []);

  async function getQVoting() {
    try {
      const allevents: Event[] = await fetchAllEvents();
      const eventsWithTimeLeft = allevents.map((event) => ({
        ...event,
        timeLeft: calculateHoursRemaining(event.start_event_date, event.end_event_date),
      }));
      setEvents(eventsWithTimeLeft);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  return (
    <ScrollView>
      <Box>
        <Box m={2} flexDirection="row" borderBottomLeftRadius={30}>
          <Center flex={2}>
            <Text color={"#004282"} fontSize={33} fontWeight={900}>
              Results Screen
            </Text>
          </Center>
          <Center flex={1}></Center>
        </Box>
        {events.map((event) => (
          <QVSCard
            key={event._id}
            _id={event._id}
            title={event.event_title}
            description={event.event_description}
            votes={event.num_voters}
            totalVotes={event.credits_per_voter}
            timeLeft={event.timeLeft ? event.timeLeft.toString() : ""}
            onPress={() => {
              navigation.navigate("ResultScreen", { event_id: event.id });
            }}
          />
        ))}
      </Box>
    </ScrollView>
  )
};

export default QVotingResult;

\