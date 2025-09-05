/** Centered Modal renders children with shaded background. Clicking outside closes modal */
import { Modal, Pressable } from "react-native";

import { sharedStyles } from "@/components/ui/sharedStyles";

export default function ModalComponent({ visible, setVisible, children, bgStyleOverride, fgStyleOverride  }: { visible: boolean; setVisible: (visible: boolean) => void; children: React.ReactNode; bgStyleOverride?: object; fgStyleOverride?: object }) {
    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade">
            <Pressable 
            onPress={() => setVisible(false)} 
            style={[
                sharedStyles.centeredContainer, 
                { 
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    cursor: 'pointer',
                    ...bgStyleOverride
                }
            ]}
            >
                <Pressable style={[{
                    flex: 1,
                    margin: "10%",
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: '#333333',
                    cursor: 'pointer',
                    ...fgStyleOverride
                }]}
                onPress={(e) => {
                    e.stopPropagation(); // Prevents closing modal when clicking inside
                }  } 
                >
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
}