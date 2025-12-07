import { Button } from '@nyangtodac/ui';
import { View } from 'react-native';

export default function ButtonPage() {
  return (
    <View>
      <Button
        text="button"
        color="primary"
        size="default"
        disabled={false}
        fullWidth={false}
      />
    </View>
  );
}
