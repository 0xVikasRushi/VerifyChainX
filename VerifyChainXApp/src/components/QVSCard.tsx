import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Box } from "native-base";

type QVSCardProps = {
  _id: string;
  title: string;
  description: string;
  votes: number;
  totalVotes: number;
  timeLeft: string;
  onPress: () => void;
  bgColor?: string;
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
      <Box style={{ ...styles.cardContainer, backgroundColor: bgColor }}>
        <Box style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.timeLeft} numberOfLines={1}>
            {timeLeft}h left ⚠️
          </Text>
        </Box>
        <Text style={styles.cardDescription}>{description}</Text>
        <Box style={styles.votesContainer}>
          <Text style={styles.votesText}>
            votes: {votes}/{totalVotes}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#90EE90",
    width: 360,
    marginVertical: 5,
    padding: 10,
    height: 140,
    borderRadius: 15,
  },
  cardHeader: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 2,
    width: "100%",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#F5F5F5",
    fontSize: 23,
    marginLeft: 1,
    fontWeight: "bold",
  },
  timeLeft: {
    fontSize: 15,
    marginTop: -0.5,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
    flex: 1,
  },
  cardDescription: {
    fontSize: 15,
    letterSpacing: -1,
    marginLeft: 10,
    fontFamily: "body",
    color: "black",
  },
  votesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: "auto",
    flex: 1,
    alignItems: "flex-end",
  },
  votesText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#e9ecef",
  },
});

export default QVSCard;
