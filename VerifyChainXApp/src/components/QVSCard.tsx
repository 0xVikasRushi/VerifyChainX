import { Box, Text } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type QVSCardProps = {
  _id: string;
  title: string;
  description: string;
  votes: number;
  totalVotes: number;
  timeLeft: string;
  onPress: () => void;
  bgColor: string;
};

const QVSCard: React.FC<QVSCardProps> = ({
  _id,
  title,
  description,
  votes,
  totalVotes,
  timeLeft,
  onPress,
  bgColor,
}) => {
  const handlePress = () => {
    onPress();
    console.log("pressed");
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box style={[styles.cardContainer, { backgroundColor: bgColor }]}>
        <Box style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.timeLeft} fontWeight={700}>
            🕒 {parseInt(timeLeft) * -1}hrs left
          </Text>
        </Box>
        <Text style={styles.cardDescription}>{description}</Text>
        <Box style={styles.votesContainer}>
          <Text style={styles.votesText}>
            🗳 votes: {votes}/{totalVotes}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    margin: 15,
    padding: 10,
    height: 140,
    borderRadius: 15,
  },
  cardHeader: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 2,
    color: "white",
  },
  cardTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  timeLeft: {
    marginLeft: 36,
    marginTop: -1.5,
    color: "red",
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: 13,
    marginLeft: 14,
    marginTop: 5,
    color: "white",
    fontFamily: "body",
  },
  votesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  votesText: {
    fontWeight: "800",
    color: "#ffcb23",
    fontSize: 15,
  },
});
export default QVSCard;
