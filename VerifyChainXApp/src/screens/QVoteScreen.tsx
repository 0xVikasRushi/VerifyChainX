import { Heading, Input, Spinner, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { fetchEventDetails, voteInEvent } from "../shared/api";
import { storage } from "../shared/mkkvStorage";
import { AppStackScreenProps } from "../types";

type QVoteScreenProps = AppStackScreenProps<"QVoteScreen">;
type Option = {
  id: string;
  label: string;
  title: string;
};

const QVoteScreen: React.FC<QVoteScreenProps> = ({ navigation, route }) => {
  const event_id = route.params.event_id;

  const [options, setOptions] = useState<Option[]>([]);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [eventData, setEventData] = useState<any>({});
  const address = storage.getString("address");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [noofVotes, setNoofVotes] = useState<number | null>(null);

  const [credits, setCredits] = useState<number>(100);

  useEffect(() => {
    fetchEvent();
  }, []);
  const fetchEvent = async () => {
    try {
      const res = await fetchEventDetails(event_id);
      const event_data = await JSON.parse(res.event.event_data);
      const cr = res.event.credits_per_voter;
      setCredits(cr);

      setEventData(res.event);
      if (Array.isArray(event_data) && event_data.length > 0) {
        let i = 0;
        const formattedOptions = event_data.map((option: Option) => {
          option.id = i.toString();
          i++;
          return option;
        });

        setOptions(formattedOptions);
      } else {
        console.error("Event data is empty or not an array");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const username = storage.getString("username");

    if (!noofVotes) {
      return Alert.alert("Please enter the number of votes");
    } else if (!selectedOption) {
      return Alert.alert("Please select an option");
    }

    if (address !== undefined && selectedOption !== null && noofVotes !== null) {
      var JSONData = {
        voter_name: username,
        project_name: options[parseInt(selectedOption)].title,
        votes: noofVotes,
      };

      const res = await voteInEvent(event_id, address, JSONData);
      setLoading(false);
      if (res) {
        Alert.alert(res.message);
        setCredits(credits - noofVotes ** 2);
      }
    }
  };

  return (
    <View style={styles.container}>
      {eventData && (
        <View style={styles.card}>
          <Text style={styles.title}>Event Title: {eventData.event_title}</Text>
          <Text style={styles.infoText}>{eventData.attestation_uid}</Text>
          <Text style={styles.description}>{eventData.event_description}</Text>
          <Text style={styles.infoCredits}>Credits Available: {credits}</Text>

          {options &&
            options.map((option) => (
              <TouchableOpacity key={option.id} onPress={() => handleOptionSelect(option.id)}>
                <View style={styles.radioButton}>
                  <RadioButton
                    color="#3498db"
                    uncheckedColor="#3498db"
                    value={option.id}
                    status={selectedOption === option.id ? "checked" : "unchecked"}
                  />
                  <Text style={styles.radioLabel}>{option.title}</Text>
                </View>
              </TouchableOpacity>
            ))}

          {selectedOption && (
            <Input
              size="lg"
              m={2}
              color="white"
              placeholder="Enter the number of votes"
              w="75%"
              keyboardType="numeric"
              onChangeText={(e) => {
                setNoofVotes(parseInt(e));
              }}
            />
          )}

          {noofVotes && (noofVotes ** 2 - credits) / 2 <= 0 ? (
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          ) : noofVotes ? (
            <Text style={styles.errorText}>You don't have enough credits</Text>
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {isLoading && (
        <View flex={1} justifyContent="center" alignItems="center">
          <VStack space={2} alignItems="center">
            <Spinner size={250} color="warning.500" />
            <Heading color="primary.500" fontSize="xl">
              {"Generating Assestation ..."}
            </Heading>
          </VStack>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50", // Dark background color
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    padding: 16,
    width: "100%",
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white", // Dark border color
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 12,
    color: "white", // Light text color
    marginBottom: 8,
  },
  infoCredits: {
    fontSize: 20,
    color: "#53FC3B",
    marginBottom: 8,
    fontWeight: "bold",
  },
  description: {
    fontSize: 17,
    color: "#ecf0f1", // Light text color
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  radioLabel: {
    color: "#ecf0f1", // Light text color
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
export default QVoteScreen;
